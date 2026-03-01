const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Fix for the "Possible EventEmitter memory leak detected" warning in your logs
process.setMaxListeners(0);

const DOWN = '\u001b[B';
const ENTER = '\r\n';
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

// Your 512 combination math: 2*2*4*2*2*2*4
const options = {
    dataSources: 2,
    languages: 2,
    styles: 4,
    installs: 2,
    aliases: 2,
    routes: 2,
    markets: 4
};

async function start() {
    let count = 0;
    // Nested loops for the first few variables to demonstrate the matrix
    for (let l = 0; l < options.languages; l++) {
        for (let s = 0; s < options.styles; s++) {
            count++;
            // The folder name based on the matrix index
            const projectName = `h2o-${count}-${l}${s}`; 
            console.log(`\n🚀 [${count}/512] Starting: ${projectName}`);
            await runHydrogen(projectName, l, s);
        }
    }
}

function runHydrogen(name, langIdx, styleIdx) {
    return new Promise((resolve) => {
        // We call npx without a name argument to trigger the "Project name?" prompt
        const child = spawn('npx', ['create-hydrogen@latest'], { shell: true });

        child.stdout.pipe(process.stdout);

        async function sendInputs() {
            await sleep(4000); 

            // 1. Connect to Shopify? (Select Mock.shop)
            child.stdin.write(ENTER);
            await sleep(2000);

            // 2. PROJECT NAME INPUT (Crucial for your 512 folders)
            console.log(`⌨️ Typing project name: ${name}`);
            child.stdin.write(name + ENTER); 
            await sleep(2000);
            
            // 3. Select Language (JS/TS)
            for (let i = 0; i < langIdx; i++) child.stdin.write(DOWN);
            child.stdin.write(ENTER);
            await sleep(1000);

            // 4. Select Styling Library (Tailwind, etc.)
            for (let i = 0; i < styleIdx; i++) child.stdin.write(DOWN);
            child.stdin.write(ENTER);
            await sleep(1000);

            // 5. Install dependencies? (Select NO to save your 4.24GB space!)
            child.stdin.write(DOWN + ENTER); 
            await sleep(1000);

            // 6. Create h2 alias? (Select NO)
            child.stdin.write(DOWN + ENTER);
            await sleep(1000);

            // 7. Scaffold routes? (Select YES)
            child.stdin.write(ENTER);
            await sleep(1000);

            // 8. URL Structure (Select Subfolders)
            child.stdin.write(ENTER);
        }

        sendInputs().catch(err => console.error("Input Loop Error:", err));

        child.on('close', (code) => {
            console.log(`✅ Finished ${name} with Exit Code: ${code}`);
            
            // Clean up any stray node_modules just in case
            const nmPath = path.join(process.cwd(), name, 'node_modules');
            if (fs.existsSync(nmPath)) {
                try {
                    execSync(`rmdir /s /q "${nmPath}"`);
                    console.log(`🧹 Disk space reclaimed for ${name}`);
                } catch (e) { /* Folder likely already empty */ }
            }
            resolve();
        });
    });
}

start();