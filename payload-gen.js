const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const templates = 5; // blank, website, ecommerce, d1, plugin
const dbs = 5;       // D1, Mongo, Postgres, SQLite, Vercel
const ENTER = '\r\n';
const DOWN = '\u001b[B';

async function start() {
    let count = 0;
    for (let t = 0; t < templates; t++) {
        for (let d = 0; d < dbs; d++) {
            count++;
            const name = `pay-${count}-${t}${d}`;
            console.log(`\n🚀 [${count}/25] Starting: ${name}`);
            await runPayload(name, t, d);
        }
    }
}

function runPayload(name, tIdx, dIdx) {
    return new Promise((resolve) => {
        const child = spawn('npx', ['create-payload-app@latest', name], { shell: true });

        child.stdout.pipe(process.stdout);

        async function sendInputs() {
            await new Promise(r => setTimeout(r, 5000));
            child.stdin.write('y' + ENTER); // Proceed with npx
            
            await new Promise(r => setTimeout(r, 3000));
            for (let i = 0; i < tIdx; i++) child.stdin.write(DOWN); // Template
            child.stdin.write(ENTER);

            await new Promise(r => setTimeout(r, 2000));
            for (let i = 0; i < dIdx; i++) child.stdin.write(DOWN); // Database
            child.stdin.write(ENTER);

            await new Promise(r => setTimeout(r, 2000));
            // Send a dummy connection string to finish the setup
            child.stdin.write(`mongodb://127.0.0.1/${name}` + ENTER); 
        }

        sendInputs();

        child.on('close', () => {
            const nmPath = path.join(process.cwd(), name, 'node_modules');
            if (fs.existsSync(nmPath)) {
                console.log(`\n🧹 Deleting node_modules for ${name} to save 300MB...`);
                execSync(`rmdir /s /q "${nmPath}"`);
            }
            resolve();
        });
    });
}

start();