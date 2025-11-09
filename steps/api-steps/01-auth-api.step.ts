import type { Handlers } from '@motiadev/core'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Step 01: Authentication API Step
export const handler: Handlers['AuthAPI'] = async (req, { state, emit }) => {
  const { action, username, password } = req.body || {}

  if (!username || !password) {
    return { error: 'Missing username or password' }
  }

  // --- SIGNUP ---
  if (action === 'signup') {
    const existingUser = await state.get('users', username)
    if (existingUser) {
      return { error: 'User already exists' }
    }

    const hashed = await bcrypt.hash(password, 10)
    await state.set('users', username, { username, password: hashed })
    await emit({ topic: 'user.created', data: { username } })

    return { message: 'Signup successful', username }
  }

  // --- LOGIN ---
  if (action === 'login') {
    const user = await state.get('users', username)
    if (!user) return { error: 'User not found' }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return { error: 'Invalid password' }

    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET || 'supersecret',
      { expiresIn: '2h' }
    )

    await emit({ topic: 'user.logged_in', data: { username } })

    return { message: 'Login successful', token }
  }

  return { error: 'Invalid action' }
}
