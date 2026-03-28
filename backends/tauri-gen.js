const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

process.setMaxListeners(0); // Prevents terminal memory warnings

const DOWN = '\u001b[B';
const ENTER = '\r\n';
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function start() {
    // UI Templates and flavors identified from your CLI screenshots
    const uiTemplates = [
        { name: 'Vanilla', flavors: 2 }, // TS, JS
        { name: 'Vue', flavors: 2 },     // TS, JS
        { name: 'Svelte', flavors: 2 },  // TS, JS
        { name: 'React', flavors: 2 },   // TS, JS
        { name: 'Solid', flavors: 2 },   // TS, JS
        { name: 'Angular', flavors: 1 }  // TS only
    ];

    console.log("🚀 Starting Tauri Configuration Matrix...");

    for (let t = 0; t < uiTemplates.length; t++) {
        for (let f = 0; f < uiTemplates[t].flavors; f++) {
            const flavorName = f === 0 ? 'ts' : 'js';
            const projectName = `tauri-${uiTemplates[t].name.toLowerCase()}-${flavorName}`;
            
            console.log(`\n📦 [Matrix] Creating: ${projectName}`);
            await runTauri(projectName, t, f);
        }
    }
    console.log("\n✅ All Tauri combinations generated.");
}

function runTauri(name, uiIdx, flavorIdx) {
    return new Promise((resolve) => {
        // Triggers the create-tauri-app CLI
        const child = spawn('npx', ['create-tauri-app@latest', name], { 
            shell: true 
        });

        child.stdout.pipe(process.stdout);

        async function sendInputs() {
            await sleep(5000); 

            // 1. App Title / Identifier
            // Accepts default based on folder name
            child.stdin.write(ENTER);
            await sleep(1500);

            // 2. Choose frontend language (TypeScript / JavaScript - Node.js)
            child.stdin.write(ENTER); 
            await sleep(1500);

            // 3. Choose your package manager (npm)
            child.stdin.write(ENTER);
            await sleep(1500);

            // 4. Choose your UI template (Vanilla, Vue, React, etc.)
            for (let i = 0; i < uiIdx; i++) child.stdin.write(DOWN);
            child.stdin.write(ENTER);
            await sleep(1500);

            // 5. Choose your UI flavor (TypeScript vs JavaScript)
            for (let i = 0; i < flavorIdx; i++) child.stdin.write(DOWN);
            child.stdin.write(ENTER);
        }

        sendInputs().catch(e => console.error("Input Error:", e));

        child.on('close', () => {
            // Reclaim space: Tauri templates can grow quickly
            const nmPath = path.join(process.cwd(), name, 'node_modules');
            const targetPath = path.join(process.cwd(), name, 'src-tauri', 'target');
            
            [nmPath, targetPath].forEach(p => {
                if (fs.existsSync(p)) {
                    try {
                        execSync(`rmdir /s /q "${p}"`);
                        console.log(`🗑️ Space reclaimed for ${name}`);
                    } catch (e) { /* Folder empty or busy */ }
                }
            });
            resolve();
        });
    });
}

start();