// src/alt/single_spa_api.ts
// This file assumes 'single-spa' is available (either globally or via SystemJS)

import * as singleSpa from "single-spa";
// Import the lifecycle functions for a basic app registration
import * as appLifecycles from './single_spa_lifecycles'; 

const DEMO_APP_NAME = "demo-app-api";

// --- Utility: Log to a dedicated DOM element for clear output ---
function logToDom(message, style = 'color: black;') {
    const output = document.getElementById('single-spa-api-output');
    if (output) {
        output.innerHTML += `<p style="${style}">${message}</p>`;
    } else {
        console.log(`[singleSpaDemo] ${message}`);
    }
}
function clearOutput() {
    const output = document.getElementById('single-spa-api-output');
    if (output) output.innerHTML = '';
}

// --- 1. Registration Demo (Simple & Config Object) ---
function registerDemoApps() {
    clearOutput();
    logToDom('--- 1. Registering Demo Apps ---', 'font-weight: bold;');
    
    // Register App using Configuration object
    singleSpa.registerApplication({
        name: DEMO_APP_NAME,
        app: appLifecycles, // Uses the imported lifecycles
        activeWhen: [
            `/demo-app-api`,
            singleSpa.pathToActiveWhen(`/users/:id/profile`), // Dynamic path example
        ],
        customProps: (name, location) => ({ authToken: "xc67f6as87f7s9d" }),
    });

    // Register a simpler app
    singleSpa.registerApplication(
        "app-simple",
        () => Promise.resolve(appLifecycles),
        (location) => location.pathname.startsWith("/simple"),
    );

    logToDom(`Registered: ${singleSpa.getAppNames().join(', ')}`);
}

// --- 2. Runtime Utilities Demo (Status, Navigation, Error Handler) ---
function runRuntimeDemo() {
    logToDom('--- 2. Runtime Utilities Demo ---', 'font-weight: bold;');
    
    // getAppStatus
    const status = singleSpa.getAppStatus(DEMO_APP_NAME);
    logToDom(`Status of ${DEMO_APP_NAME}: ${status}`); // Should be NOT_LOADED

    // getAppNames / getMountedApps
    logToDom(`All App Names: ${singleSpa.getAppNames().join(', ')}`);
    logToDom(`Mounted Apps (Pre-Reroute): ${singleSpa.getMountedApps().length}`);

    // addErrorHandler
    const errorHandler = (err) => {
        logToDom(`⚠️ Error Handled in ${err.appOrParcelName}: ${err.message}`, 'color: orange;');
        // Demo: Retry logic for LOAD_ERROR
        if (singleSpa.getAppStatus(err.appOrParcelName) === singleSpa.LOAD_ERROR) {
            // In a real app, you would use System.delete(System.resolve(err.appOrParcelName));
            logToDom('...Simulating System.delete() to retry module load.', 'color: orange;');
        }
    };
    singleSpa.addErrorHandler(errorHandler);
    logToDom('Error handler added.');

    // navigateToUrl and triggerAppChange (Simulated navigation)
    logToDom('Simulating Navigation to activate demo-app-api...');
    singleSpa.navigateToUrl('/demo-app-api'); // This triggers a reroute

    // Wait for the app to mount, then run more checks
    setTimeout(() => {
        logToDom('--- Reroute Results (2s delay) ---', 'font-weight: bold; color: green;');
        logToDom(`Mounted Apps (Post-Reroute): ${singleSpa.getMountedApps().join(', ')}`, 'color: green;');
        logToDom(`New Status: ${singleSpa.getAppStatus(DEMO_APP_NAME)}`, 'color: green;');
        
        // unloadApplication Demo
        logToDom(`Unloading ${DEMO_APP_NAME} (wait for unmount)...`);
        singleSpa.unloadApplication(DEMO_APP_NAME, { waitForUnmount: true }).then(() => {
            logToDom(`${DEMO_APP_NAME} successfully UNLOADED. Status: ${singleSpa.getAppStatus(DEMO_APP_NAME)}`, 'color: red;');
            singleSpa.removeErrorHandler(errorHandler);
            logToDom('Error handler removed. Demo complete.', 'color: red;');
        });

        // Trigger reroute to naturally unmount the app
        singleSpa.navigateToUrl('/'); 
    }, 2000); 
}

// --- 3. Events Demo (Requires separate window listener) ---
export function setupEventListeners() {
    logToDom('--- 3. Event Listeners Setup ---', 'font-weight: bold; color: purple;');
    
    window.addEventListener("single-spa:before-routing-event", (evt) => {
        logToDom(`[Event] single-spa:before-routing-event (URL: ${evt.detail.newUrl})`, 'color: purple;');
        // Example: Canceling navigation for a specific route change
        if (evt.detail.newUrl.includes('/cancel-me')) {
            evt.detail.cancelNavigation();
            logToDom('‼️ Navigation to /cancel-me CANCELED!', 'color: red;');
        }
    });
    
    window.addEventListener("single-spa:first-mount", () => {
        logToDom('🎉 single-spa:first-mount fired!', 'color: green; font-weight: bold;');
    });
}


/**
 * Main function to run the full demonstration.
 */
export function runSingleSpaApiDemo() {
    clearOutput();
    // Ensure start() has been called by the root single-spa-config.js
    if (!singleSpa.getAppNames().length) {
        logToDom('single-spa has not started or has no apps. Please ensure single-spa-config.js is loaded.', 'color: red;');
        return;
    }
    
    // Register and run the demos sequentially
    registerDemoApps();
    runRuntimeDemo();
}