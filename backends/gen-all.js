const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

process.setMaxListeners(0);

const DOWN = '\u001b[B';
const ENTER = '\r\n';
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function start() {
    // 1. ADONISJS MATRIX (Kind of App)
    const adonisKinds = ['Hypermedia', 'React (Inertia)', 'Vue (Inertia)', 'API', 'API (monorepo)'];
    console.log("--- Starting AdonisJS Matrix ---");
    for (let i = 0; i < adonisKinds.length; i++) {
        await runAdonis(`adonis-app-${i}`, i);
    }

    // 2. TAURI MATRIX (UI Template * Flavor)
    const tauriUIs = ['Vanilla', 'Vue', 'Svelte', 'React', 'Solid'];
    console.log("\n--- Starting Tauri Matrix ---");
    for (let u = 0; u < tauriUIs.length; u++) {
        for (let f = 0; f < 2; f++) {
            await runTauri(`tauri-${tauriUIs[u].toLowerCase()}-${f === 0 ? 'ts' : 'js'}`, u, f);
        }
    }
}

/** 🚀 AdonisJS Runner */
function runAdonis(name, kindIdx) {
    return new Promise((resolve) => {
        console.log(`🔷 Creating AdonisJS: ${name}`);
        const child = spawn('npx', ['create-adonisjs@latest', name], { shell: true });

        async function sendInputs() {
            await sleep(5000); 
            child.stdin.write('y' + ENTER); // Ok to proceed
            await sleep(3000);
            for (let i = 0; i < kindIdx; i++) child.stdin.write(DOWN);
            child.stdin.write(ENTER);
            // Defaulting remaining prompts (Auth, Database, etc.)
            await sleep(2000); child.stdin.write(ENTER);
            await sleep(1000); child.stdin.write(ENTER);
        }

        sendInputs().catch(e => {});
        child.on('close', () => { cleanup(name); resolve(); });
    });
}

/** 🚀 Tauri Runner */
function runTauri(name, uiIdx, flavorIdx) {
    return new Promise((resolve) => {
        console.log(`🦀 Creating Tauri: ${name}`);
        const child = spawn('npx', ['create-tauri-app@latest', name], { shell: true });

        async function sendInputs() {
            await sleep(4000);
            child.stdin.write(ENTER); // Default Identifier
            await sleep(1000);
            child.stdin.write(ENTER); // JavaScript/TypeScript (Node)
            await sleep(1000);
            child.stdin.write(ENTER); // npm
            await sleep(1000);
            for (let i = 0; i < uiIdx; i++) child.stdin.write(DOWN);
            child.stdin.write(ENTER); // UI Template
            await sleep(1000);
            for (let i = 0; i < flavorIdx; i++) child.stdin.write(DOWN);
            child.stdin.write(ENTER); // Flavor
        }

        sendInputs().catch(e => {});
        child.on('close', () => { cleanup(name); resolve(); });
    });
}

/** 🧹 Emergency Space Cleanup */
function cleanup(projectName) {
    const targets = [
        path.join(process.cwd(), projectName, 'node_modules'),
        path.join(process.cwd(), projectName, 'src-tauri', 'target')
    ];
    targets.forEach(p => {
        if (fs.existsSync(p)) {
            try {
                execSync(`rmdir /s /q "${p}"`);
                console.log(`🗑️ Space reclaimed for ${projectName}`);
            } catch (e) {}
        }
    });
}

start();