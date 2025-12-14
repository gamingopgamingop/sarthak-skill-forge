/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly API_KEY?: string;
  // Add other environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// For Node.js environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY?: string;
    // Add other environment variables here as needed
  }
}