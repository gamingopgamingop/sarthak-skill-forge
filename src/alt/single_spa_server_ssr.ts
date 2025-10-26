// src/alt/single_spa_server_ssr.js

import { constructServerLayout, sendLayoutHTTPResponse } from 'single-spa-layout/server';
import http from 'http';
import path from 'path';

// --- 1. Define the Server Layout ---
// We'll use the HTML string approach for simplicity in a client-side project.
const serverLayout = constructServerLayout({
    html: `
        <html>
            <head>
                <title>Server-Side Single-SPA Demo</title>
                <fragment name="import-map"></fragment>
            </head>
            <body>
                <single-spa-router>
                    <route default>
                        <application name="nav"></application>
                        <application name="home"></application>
                    </route>
                    <route path="/app1">
                        <application name="app1"></application>
                    </route>
                </single-spa-router>
            </body>
        </html>
    `,
});

// --- 2. Define the Server Demonstration Logic ---

/**
 * Creates and starts a local HTTP server to demonstrate single-spa SSR.
 * NOTE: This server will only run when this specific router is active.
 */
export function startServerSSRDemo() {
    // Prevent starting the server multiple times
    if ((window as any).serverSSPDemoActive) {
        console.log("[single-spa-SSR] Server demo already running.");
        return;
    }
    
    const server = http.createServer((req, res) => {
        console.log(`[single-spa-SSR] Request received for: ${req.url}`);

        sendLayoutHTTPResponse({
            res,
            serverLayout,
            urlPath: req.url || '/', // Use req.url instead of req.path
            nonce: "yourNonceHere",
            
            // Function to render the application's HTML content
            async renderApplication({ appName, propsPromise }) {
                // In a real server, you'd fetch the HTML/assets for the appName
                const props = await propsPromise; 
                return {
                    assets: `<link rel="stylesheet" href="/assets/${appName}.css">`,
                    content: `
                        <div id="app-root-${appName}">
                            <h1>Server-Rendered: ${appName}</h1>
                            <p>Auth token prop: ${props.authToken}</p>
                        </div>
                    `
                };
            },
            
            // Function to fetch content for fragments (e.g., import maps)
            async renderFragment(fragmentName) {
                if (fragmentName === 'import-map') {
                    return `<script type="systemjs-importmap">{"imports": { /* map here */ }}</script>`;
                }
                return '';
            },
            
            // Example of retrieving props
            async retrieveProp(propName) {
                if (propName === 'authToken') return "server-token-12345";
                return "default prop value";
            },

            // Other lifecycle methods (retrieveApplicationHeaders, assembleFinalHeaders)
            async retrieveApplicationHeaders() { return { 'x-ssr-demo': 'true' }; },
            assembleFinalHeaders(allHeaders) { return { 'Content-Type': 'text/html' }; }
        });
    });

    server.listen(8081, () => {
        console.log("------------------------------------------------------------------");
        console.log("[single-spa-SSR] ⚠️ Server-Side Demo HTTP Server running on http://localhost:8081");
        console.log("[single-spa-SSR] You must navigate manually to this URL to see the output.");
        console.log("------------------------------------------------------------------");
        (window as any).serverSSPDemoActive = true;
    });

    return server; // Return the server instance for cleanup
}


// --- 3. React Wrapper Component ---

import React, { useEffect, useRef } from 'react';

export const SingleSpaServerSSRWrapper: React.FC = () => {
    const serverRef = useRef(null);

    useEffect(() => {
        // Start the server when this router is selected
        const serverInstance = startServerSSRDemo();
        serverRef.current = serverInstance;

        // Cleanup: stop the server when this component unmounts
        return () => {
            if (serverRef.current) {
                console.log("[single-spa-SSR] Stopping Server Demo on unmount.");
                serverRef.current.close();
                (window as any).serverSSPDemoActive = false;
            }
        };
    }, []);

    return (
        <div style={{ border: '3px solid #8A2BE2', padding: '15px' }}>
            <h2>Single-SPA Server-Side Router Active (Router 18)</h2>
            <p>This wrapper starts a **NodeJS HTTP Server** locally.</p>
            <p><strong>Status:</strong> Server is running on <a href="http://localhost:8081" target="_blank">http://localhost:8081</a></p>
            <p>You must open this link in a new tab to view the server-side rendered HTML output.</p>
            <p>Check the console for server logs when accessing the link.</p>
        </div>
    );
};