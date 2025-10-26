import React, { useEffect } from 'react';
import { constructRoutes, constructLayoutEngine } from 'single-spa-layout';
// Import necessary single-spa functions
import { registerApplication, start } from 'single-spa'; 
// Import your declarative Parcel config for use in the layout loaders
import { MyParcelConfig } from './my_declarative_parcel'; 
// NOTE: You'd typically only start single-spa once globally, but for this experiment,
// we'll simulate the startup here if it hasn't happened yet.

// --- 1. Define the HTML Template (Conceptual) ---
// In a real project, this would be a separate file (e.g., index.html or a string).
// For the demo, we define a simple layout structure string:
const layoutTemplate = `
  <single-spa-router>
    <main>
      <route default>
        <application name="@yourorg/header" />
        <div id="main-content">
            <template slot="mainContent"></template>
        </div>
      </route>
      <route path="/app1">
         <application name="app1" />
      </route>
    </single-spa-router>
`;

// --- 2. Define Layout Data (Your Snippet Integration) ---
const layoutData = {
  // Props and Loaders allow data and components to be shared with micro-frontends
  props: {
    authToken: "78sf9d0fds89-0fysdiuf6sf8",
    // NOTE: Replace fetch with an actual data call if needed
    loggedInUser: { id: 1, name: 'gaming op' }
  },
  loaders: {
    mainContent: `<div style="text-align: center;"><img src="loading.gif"></div>`,
    // Load a single-spa parcel configuration (e.g., your declarative parcel)
    topNav: MyParcelConfig, 
  }
};

// --- 3. Construct Routes and Engine ---
const resolvedRoutes = constructRoutes(layoutTemplate, layoutData);
const layoutEngine = constructLayoutEngine(resolvedRoutes);


export const SingleSpaLayoutWrapper: React.FC = () => {
  useEffect(() => {
    // 4. Register and Start the Layout Engine
    // This is the single-spa application that runs the layout logic.
    registerApplication({
      name: "single-spa-layout",
      app: layoutEngine.getApplication(),
      activeWhen: () => true, // Layout is always active
      customProps: { singleSpaLayout: true }
    });

    // We also need to register the apps used in the template (app1 and @yourorg/header)
    // For this demo, we'll assume app1 is already registered via single-spa-config.js

    if (!(window as any).singleSpaStarted) {
        start();
        (window as any).singleSpaStarted = true; // Prevents multiple calls to start()
    }
    
    // Cleanup function to unregister the layout app when the React component unmounts
    return () => {
        // NOTE: Unregistering the layout engine is complex and often unnecessary, 
        // but for a clean experiment, we'd ideally stop its effects here.
    };
  }, []);

  return (
    <div style={{ border: '3px solid #FF5733', padding: '10px' }}>
        <h2>Single-SPA Layout Engine Active (Router 17)</h2>
        <p>This wrapper starts the layout engine. Page structure is now controlled by the layout template.</p>
        {/* The actual micro-frontends will mount outside of this React component */}
        <p style={{ fontWeight: 'bold' }}>See the main DOM/HTML for layout changes on URL navigation.</p>
    </div>
  );
};