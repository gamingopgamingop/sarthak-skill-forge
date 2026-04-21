const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

process.setMaxListeners(0); // Prevents terminal memory warnings

const DOWN = '\u001b[B';
const ENTER = '\r\n';
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function start() {
    // The 5 "Kind of App" options seen in image_bd0ce2.png
    const appKinds = [
        'Hypermedia (Starter)',
        'React (Inertia)',
        'Vue (Inertia)',
        'API (Starter)',
        'API (Monorepo)'
    ];

    console.log("🚀 Starting AdonisJS Configuration Matrix...");

    for (let i = 0; i < appKinds.length; i++) {
        const projectName = `adonis-${i}`; // Keeps folder names simple and short
        console.log(`\n🔷 [Matrix] Creating App Kind: ${appKinds[i]}`);
        await runAdonis(projectName, i);
    }
    
    console.log("\n✅ AdonisJS matrix generation complete.");
}

function runAdonis(name, kindIdx) {
    return new Promise((resolve) => {
        // Triggers create-adonisjs as shown in your command history
        const child = spawn('npx', ['create-adonisjs@latest', name], { 
            shell: true 
        });

        child.stdout.pipe(process.stdout);

        async function sendInputs() {
            await sleep(5000); 
            // 1. "Need to install the following packages... OK to proceed? (y)"
            child.stdin.write('y' + ENTER); 
            await sleep(3000);

            // 2. "Select the kind of app you want to create"
            for (let i = 0; i < kindIdx; i++) child.stdin.write(DOWN);
            child.stdin.write(ENTER);
            await sleep(2000);

            // 3. Project Name prompt (Adonis may ask to confirm folder name)
            child.stdin.write(ENTER);
            await sleep(1500);

            // 4. Additional prompts (Auth, Database, etc.) 
            // We hit ENTER to accept defaults for speed
            child.stdin.write(ENTER); 
            await sleep(1000);
            child.stdin.write(ENTER);
        }

        sendInputs().catch(e => console.error("Input Error:", e));

        child.on('close', () => {
            // CRITICAL: Reclaim space immediately after project is built
            const nmPath = path.join(process.cwd(), name, 'node_modules');
            if (fs.existsSync(nmPath)) {
                try {
                    execSync(`rmdir /s /q "${nmPath}"`);
                    console.log(`🗑️ node_modules cleared for ${name} (~250MB saved)`);
                } catch (e) { /* Folder likely already empty */ }
            }
            resolve();
        });
    });
}

start();