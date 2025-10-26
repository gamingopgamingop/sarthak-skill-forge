// src/alt/single_spa_lifecycles.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import singleSpaReact from 'single-spa-react';

// --- Placeholder Root Component for the Micro-Frontend ---
const RootComponent = (props) => {
    // This is the component that will render when the app is active
    return (
        <div style={{ padding: '20px', border: '2px dashed blue' }}>
            <h3>Micro-Frontend Content ({props.name})</h3>
            <p>This content is managed by the single-spa lifecycle.</p>
        </div>
    );
};

// --- Standard Single-SPA Lifecycle Functions ---

// 1. BOOTSTRAP: Called once when the application is first loaded.
export function bootstrap(props) {
  const {
    name,       // The name of the application ("app1" or "app2")
    singleSpa,  // The singleSpa instance
    mountParcel,// Function for manually mounting other micro-frontends
    customProps,// Additional custom information
  } = props; 
  console.log(`[single-spa] Bootstrapping application: ${name}`);
  return Promise.resolve();
}

// 2. MOUNT: Called when the application should be rendered (activeWhen returns true).
export const { mount, unmount } = singleSpaReact({
    // Use the RootComponent created above
    rootComponent: RootComponent,
    
    // We need a DOM element ID where this micro-frontend will mount
    domElementGetter: (props) => document.getElementById(`micro-frontend-container-${props.name}`),
});

// 3. UPDATE: Called when props are updated (less common).
export function update(props) {
  console.log(`[single-spa] Updating application: ${props.name}`);
  // Logic to handle prop changes goes here
  return Promise.resolve();
}