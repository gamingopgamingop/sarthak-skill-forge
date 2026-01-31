// api/index.js
// @ts-nocheck
// @ts-ignore
import { createStartHandler } from '@tanstack/start/server'
import app from '../dist/server/server.js'

export default createStartHandler(app)
