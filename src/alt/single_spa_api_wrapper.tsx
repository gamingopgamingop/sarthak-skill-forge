import React, { useEffect } from 'react';
// Import the demo logic and event setup
import { runSingleSpaApiDemo, setupEventListeners } from './single_spa_api'; 
import { start } from 'single-spa';

export const SingleSpaApiWrapper: React.FC = () => {

    useEffect(() => {
        // Ensure single-spa is started for the API functions to work
        if (!(window as any).singleSpaStarted) {
             start();
             (window as any).singleSpaStarted = true;
        }

        setupEventListeners();
        runSingleSpaApiDemo();
        
        // This is a complex demo with async unloads; cleanup is tricky.
        // For simplicity, we let the internal demo handle the app unloading.
        return () => {
             // Clean up event listeners here if necessary
        };
    }, []);

    return (
        <div style={{ border: '3px solid #FF8C00', padding: '15px' }}>
            <h2>Single-SPA Applications API Demo (Router 19)</h2>
            <p>This wrapper runs a sequence of API calls (register, status, navigate, unload, error handling, and events) defined in `single_spa_api_demo.js`.</p>
            <p><strong>Check the Console</strong> for lifecycle timing and event outputs.</p>
            
            <div 
                id="single-spa-api-output" 
                style={{ marginTop: '10px', padding: '10px', border: '1px solid #ccc', maxHeight: '300px', overflowY: 'auto', backgroundColor: '#fafafa' }}
            >
                {/* Output will be injected here by the JavaScript demo functions */}
                Initializing API demo...
            </div>

            <p style={{marginTop: '10px'}}>Try navigating to <a href="/cancel-me" onClick={(e) => { e.preventDefault(); (window as any).singleSpa.navigateToUrl('/cancel-me'); }}>/cancel-me</a> to see **Navigation Cancellation**.</p>
        </div>
    );
};