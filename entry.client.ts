// [entry.client.js]
// @ts-nocheck
// @ts-ignore
import '@vitejs/plugin-react-swc/preamble'
// [entry.client.js]
// @ts-ignore
import '@vitejs/plugin-react/preamble'
import { hydrateRoot } from 'react-dom/client'
import { RemixBrowser } from '@remix-run/react'

hydrateRoot(document, <RemixBrowser />)
