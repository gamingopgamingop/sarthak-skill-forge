const { spawn } = require('child_process');

const options = {
    dbs: 3,    
    caches: 2, 
    stores: 2, 
    emails: 3, 
    queues: 4  
};

const DOWN = '\u001b[B';
const ENTER = '\r\n'; // Vital for Windows CMD/PowerShell compatibility
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
        // shell: true is necessary on Windows to resolve the 'intent' command
        const child = spawn('intent', ['new', name], { shell: true });

        child.stdout.pipe(process.stdout);

        async function sendInputs() {
            // Wait longer for the CLI to be ready for input
            await sleep(3500); 

            for (const choiceIndex of choices) {
                // Press Down Arrow
                for (let i = 0; i < choiceIndex; i++) {
                    child.stdin.write(DOWN);
                    await sleep(200); // Slower arrow presses
                }
                // Confirm selection
                child.stdin.write(ENTER);
                await sleep(1000); // Give the CLI a full second to render the next question
            }
        }

        sendInputs().catch(err => console.error("Input Loop Error:", err));

        child.on('close', (code) => {
            console.log(`✅ Finished ${name} (Exit Code: ${code})`);
            resolve();
        });

        child.on('error', (err) => {
            console.error('Spawn Error:', err);
            resolve();
        });
    });
}

start();