const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ... (keep your existing options and start function)
const options = { dbs: 3, caches: 2, stores: 2, emails: 3, queues: 4 };
const DOWN = '\u001b[B';
const ENTER = '\r\n';
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function start() {
    let count = 0;
    for (let d = 0; d < options.dbs; d++) {
        for (let c = 0; c < options.caches; c++) {
            for (let s = 0; s < options.stores; s++) {
                for (let e = 0; e < options.emails; e++) {
                    for (let q = 0; q < options.queues; q++) {
                        count++;
                        const name = `itn-${count}-${d}${c}${s}${e}${q}`;
                        console.log(`\n🚀 [${count}/144] Starting: ${name}`);
                        await runIntent(name, [d, c, s, e, q]);
                    }
                }
            }
        }
    }
}

function runIntent(name, choices) {
    return new Promise((resolve) => {
        const child = spawn('intent', ['new', name], { shell: true });
        child.stdout.pipe(process.stdout);

        async function sendInputs() {
            await sleep(3500); 
            for (const choiceIndex of choices) {
                for (let i = 0; i < choiceIndex; i++) {
                    child.stdin.write('\u001b[B'); // DOWN
                    await sleep(200);
                }
                child.stdin.write('\r\n'); // ENTER
                await sleep(1000);
            }
        }

        sendInputs();

        child.on('close', () => {
            const nodeModulesPath = path.join(process.cwd(), name, 'node_modules');
            
            // Reclaim ~300MB immediately
            if (fs.existsSync(nodeModulesPath)) {
                console.log(`\n🧹 Cleaning 303MB from ${name}...`);
                try {
                    execSync(`rmdir /s /q "${nodeModulesPath}"`); 
                    console.log(`✅ Space reclaimed.`);
                } catch (e) {
                    console.log(`⚠️ Manual delete needed for ${name}`);
                }
            }
            resolve();
        });
    });
}