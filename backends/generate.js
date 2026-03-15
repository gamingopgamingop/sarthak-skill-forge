const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ... (keep your existing options and start function)

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