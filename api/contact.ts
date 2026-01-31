// api/contact.ts
// @ts-nocheck
// @ts-ignore

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { z } from 'zod'
import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'
import helmet from 'helmet'
import cors from 'cors'
import nodemailer from 'nodemailer'
import { MongoClient } from 'mongodb'
const CONTACT_SCHEMA = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  phone: z.string().optional(),
  subject: z.string().optional(),
  captcha: z.string().optional()
})

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
})

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 5,
  delayMs: 500
})

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

const mongoClient = new MongoClient(process.env.MONGODB_URI!)
const db = mongoClient.db('contact_db')
const collection = db.collection('submissions')

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  await new Promise<void>((resolve, reject) => {
    helmet()(req, res, (err) => (err ? reject(err) : resolve()))
  })
  await new Promise<void>((resolve, reject) => {
    cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') || '*' })(req, res, (err) => (err ? reject(err) : resolve()))
  })
  await new Promise<void>((resolve, reject) => {
    speedLimiter(req, res, (err) => (err ? reject(err) : resolve()))
  })
  await new Promise<void>((resolve, reject) => {
    rateLimiter(req, res, (err) => (err ? reject(err) : resolve()))
  })

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let body
  try {
    body = CONTACT_SCHEMA.parse(req.body)
  } catch (err) {
    return res.status(400).json({ error: 'Validation failed', details: err })
  }

  const { name, email, message, phone, subject, captcha } = body

  if (process.env.CAPTCHA_SECRET && captcha) {
    const verify = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.CAPTCHA_SECRET}&response=${captcha}`
    }).then(r => r.json())
    if (!verify.success) return res.status(400).json({ error: 'Captcha verification failed' })
  }

  const timestamp = new Date()
  const entry = {
    name,
    email,
    message,
    phone,
    subject,
    timestamp,
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    userAgent: req.headers['user-agent']
  }

  try {
    await collection.insertOne(entry)

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_EMAIL,
      subject: subject || `Contact from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
             <p><strong>Message:</strong></p>
             <p>${message.replace(/\n/g, '<br/>')}</p>`
    })

    return res.status(200).json({ success: true, id: entry._id })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
