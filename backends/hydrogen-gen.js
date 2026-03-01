// const { spawn, execSync } = require('child_process');
// const fs = require('fs');
// const path = require('path');

// // Fix for the "Possible EventEmitter memory leak detected" warning in your logs
// process.setMaxListeners(0);

// const DOWN = '\u001b[B';
// const ENTER = '\r\n';
// const sleep = (ms) => new Promise(res => setTimeout(res, ms));

// // Your 512 combination math: 2*2*4*2*2*2*4
// const options = {
//     dataSources: 2,
//     languages: 2,
//     styles: 4,
//     installs: 2,
//     aliases: 2,
//     routes: 2,
//     markets: 4
// };

// async function start() {
//     let count = 0;
//     // Nested loops for the first few variables to demonstrate the matrix
//     for (let l = 0; l < options.languages; l++) {
//         for (let s = 0; s < options.styles; s++) {
//             count++;
//             // The folder name based on the matrix index
//             const projectName = `h2o-${count}-${l}${s}`; 
//             console.log(`\n🚀 [${count}/512] Starting: ${projectName}`);
//             await runHydrogen(projectName, l, s);
//         }
//     }
// }

// function runHydrogen(name, langIdx, styleIdx) {
//     return new Promise((resolve) => {
//         // We call npx without a name argument to trigger the "Project name?" prompt
//         const child = spawn('npx', ['create-hydrogen@latest'], { shell: true });

//         child.stdout.pipe(process.stdout);

//         async function sendInputs() {
//             await sleep(4000); 

//             // 1. Connect to Shopify? (Select Mock.shop)
//             child.stdin.write(ENTER);
//             await sleep(2000);

//             // 2. PROJECT NAME INPUT (Crucial for your 512 folders)
//             console.log(`⌨️ Typing project name: ${name}`);
//             child.stdin.write(name + ENTER); 
//             await sleep(2000);
            
//             // 3. Select Language (JS/TS)
//             for (let i = 0; i < langIdx; i++) child.stdin.write(DOWN);
//             child.stdin.write(ENTER);
//             await sleep(1000);

//             // 4. Select Styling Library (Tailwind, etc.)
//             for (let i = 0; i < styleIdx; i++) child.stdin.write(DOWN);
//             child.stdin.write(ENTER);
//             await sleep(1000);

//             // 5. Install dependencies? (Select NO to save your 4.24GB space!)
//             child.stdin.write(DOWN + ENTER); 
//             await sleep(1000);

//             // 6. Create h2 alias? (Select NO)
//             child.stdin.write(DOWN + ENTER);
//             await sleep(1000);

//             // 7. Scaffold routes? (Select YES)
//             child.stdin.write(ENTER);
//             await sleep(1000);

//             // 8. URL Structure (Select Subfolders)
//             child.stdin.write(ENTER);
//         }

//         sendInputs().catch(err => console.error("Input Loop Error:", err));

//         child.on('close', (code) => {
//             console.log(`✅ Finished ${name} with Exit Code: ${code}`);
            
//             // Clean up any stray node_modules just in case
//             const nmPath = path.join(process.cwd(), name, 'node_modules');
//             if (fs.existsSync(nmPath)) {
//                 try {
//                     execSync(`rmdir /s /q "${nmPath}"`);
//                     console.log(`🧹 Disk space reclaimed for ${name}`);
//                 } catch (e) { /* Folder likely already empty */ }
//             }
//             resolve();
//         });
//     });
// }

// start();


const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

process.setMaxListeners(0); // Prevents terminal memory warnings

const DOWN = '\u001b[B';
const ENTER = '\r\n';
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function start() {
    let count = 0;

    // 512 Combination Matrix: 2 * 2 * 4 * 2 * 2 * 2 * 4
    for (let data = 0; data < 2; data++) {           // Mock vs Account
    for (let lang = 0; lang < 2; lang++) {           // JS vs TS
    for (let style = 0; style < 4; style++) {        // Tailwind, Vanilla, CSS, PostCSS
    for (let install = 1; install < 2; install++) {  // Forced to 'No' (Index 1) for space
    for (let alias = 1; alias < 2; alias++) {        // Forced to 'No' (Index 1) for safety
    for (let route = 0; route < 2; route++) {        // Yes vs No scaffold
    for (let market = 0; market < 4; market++) {     // Subfolders, Subdomains, TLDs, Later
        
        count++;
        const projectName = `h2-cfg-${count}`;
        console.log(`\n🚀 [${count}/512] Creating: ${projectName}`);
        
        // Pass the specific indices to the runner
        await runHydrogen(projectName, { data, lang, style, route, market });
    }
    }}}}}}}


function runHydrogen(name, cfg) {
    return new Promise((resolve) => {
        const child = spawn('npx', ['create-hydrogen@latest'], { shell: true });

        async function sendInputs() {
            await sleep(4500); 

            // 1. Data Source
            for (let i = 0; i < cfg.data; i++) child.stdin.write(DOWN);
            child.stdin.write(ENTER);
            await sleep(1500);

            // 2. Project Name Input
            child.stdin.write(name + ENTER); 
            await sleep(1500);
            
            // 3. Language
            for (let i = 0; i < cfg.lang; i++) child.stdin.write(DOWN);
            child.stdin.write(ENTER);
            await sleep(1000);

            // 4. Styling
            for (let i = 0; i < cfg.style; i++) child.stdin.write(DOWN);
            child.stdin.write(ENTER);
            await sleep(1000);

            // 5. Install Dependencies? (ALWAYS SELECT NO TO SAVE DISK)
            child.stdin.write(DOWN + ENTER); // Index 1 is 'No'
            await sleep(1000);

            // 6. Create Alias? (ALWAYS SELECT NO)
            child.stdin.write(DOWN + ENTER); // Index 1 is 'No'
            await sleep(1000);

            // 7. Scaffold Routes?
            for (let i = 0; i < cfg.route; i++) child.stdin.write(DOWN);
            child.stdin.write(ENTER);
            await sleep(1000);

            // 8. Markets
            for (let i = 0; i < cfg.market; i++) child.stdin.write(DOWN);
            child.stdin.write(ENTER);
        }

        sendInputs().catch(e => console.error(e));

        child.on('close', () => {
            console.log(`✅ Project ${name} setup complete.`);
            resolve();
        });
    });
}

start();