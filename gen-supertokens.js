const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

process.setMaxListeners(0); // Prevents terminal EventEmitter memory leak warnings

const DOWN = '\u001b[B';
const ENTER = '\r\n';
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function start() {
    // 7 Options shown in your terminal capture for frontend
    const frontends = ['React', 'Next.js', 'Remix', 'Astro', 'Astro-React', 'SvelteKit', 'Nuxt.js'];
    
    // We will baseline the backend options to run through Node.js frameworks for the test matrix
    const nodeFrameworks = ['Koa.js', 'Nest.js', 'Express.js'];
    
    // Auth recipes listed in the final prompt
    const authRecipes = ['Email Password', 'Social Login', 'Social+EmailPassword', 'Passwordless'];

    console.log("🚀 Starting SuperTokens Configuration Matrix...");

    let count = 0;
    for (let f = 0; f < frontends.length; f++) {
        for (let n = 0; n < nodeFrameworks.length; n++) {
            for (let a = 0; a < authRecipes.length; a++) {
                count++;
                const projectName = `st-${count}-${f}${n}${a}`;
                
                console.log(`\n🔒 [Matrix] Creating Combination [${count}]: ${projectName}`);
                console.log(`   └─ Front: ${frontends[f]} | Back Framework: ${nodeFrameworks[n]} | Recipe: ${authRecipes[a]}`);
                
                await runSuperTokens(projectName, f, n, a);
            }
        }
    }
    console.log("\n✅ SuperTokens matrix generation completed.");
}

function runSuperTokens(name, frontIdx, nodeIdx, authIdx) {
    return new Promise((resolve) => {
        const child = spawn('npx', ['create-supertokens-app@latest'], { shell: true });

        // Pipe stream output to current terminal to track creation status
        child.stdout.pipe(process.stdout);

        async function sendInputs() {
            // Wait out initial npx package download and ASCII banner generation
            await sleep(5500); 
            child.stdin.write('y' + ENTER); // Confirm "Ok to proceed? (y)"
            
            await sleep(3500);
            // 1. App Name
            child.stdin.write(name + ENTER);
            await sleep(2000);

            // 2. Frontend Framework Selection
            for (let i = 0; i < frontIdx; i++) child.stdin.write(DOWN);
            child.stdin.write(ENTER);
            await sleep(2000);

            // 3. Backend Framework Selection (Hardcoding index 0 for Node.js)
            child.stdin.write(ENTER);
            await sleep(2000);

            // 4. Node.js Ecosystem Framework Selection (Koa, Nest, Express)
            for (let i = 0; i < nodeIdx; i++) child.stdin.write(DOWN);
            child.stdin.write(ENTER);
            await sleep(2000);

            // 5. Auth Strategy Recipe Selection
            for (let i = 0; i < authIdx; i++) child.stdin.write(DOWN);
            child.stdin.write(ENTER);
        }

        sendInputs().catch(e => console.error("Prompt Interaction Fault:", e));

        child.on('close', () => {
            // Targeted disk wipe across structural levels to protect storage
            const nmRootPath = path.join(process.cwd(), name, 'node_modules');
            const nmFrontendPath = path.join(process.cwd(), name, 'frontend', 'node_modules');
            const nmBackendPath = path.join(process.cwd(), name, 'backend', 'node_modules');
            
            [nmRootPath, nmFrontendPath, nmBackendPath].forEach(targetFolder => {
                if (fs.existsSync(targetFolder)) {
                    try {
                        execSync(`rmdir /s /q "${targetFolder}"`);
                    } catch (err) { /* Directory already abandoned or empty */ }
                }
            });
            
            console.log(`🧹 Wiped volatile footprint directories for ${name}.`);
            resolve();
        });
    });
}

start();