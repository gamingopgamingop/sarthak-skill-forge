// import React, { createContext, useContext } from 'react';
// // 1. The primary function to create a single-spa application lifecycle
// import singleSpaReact, { SingleSpaContext } from "single-spa-react"; 

// // 2. Parcel imports for loading micro-frontends (Different syntax styles)
// import Parcel from 'single-spa-react/lib/esm/parcel'; // ES Module path
// import ParcelComponent from 'single-spa-react/parcel'; // CommonJS path

// // --- Conceptual Application Setup ---

// // Create a simple dummy context to demonstrate usage (often not required)
// const MyContext = createContext({}); 

// // A dummy component representing a micro-frontend to be loaded via Parcel
// const DummyMicroFrontend = ({ greeting }: { greeting: string }) => (
//   <div style={{ padding: '10px', border: '1px solid orange' }}>
//     <h3>{greeting} (Loaded via single-spa Parcel)</h3>
//     <p>This section uses its own routing/logic, isolated from the root.</p>
//   </div>
// );

// // --- The Wrapper Component for the Router Pool ---

// export const SingleSpaReactWrapper: React.FC = () => {
//   // In a real single-spa environment, this component would be the root of a micro-frontend.
//   // Here, we simulate its environment.

//   // The actual single-spa application is defined outside of React, but here we 
//   // simulate using the context and loading a Parcel.
  
//   // NOTE: We use ParcelComponent from one of the imports, but both are available.
  
//   return (
//     <SingleSpaContext.Provider value={{ name: 'root', mountParcel: () => Promise.resolve({} as any) }}>
//       <MyContext.Provider value={{ user: 'GamingOp' }}>
//         <div style={{ border: '2px solid #00BFFF', padding: '15px' }}>
//           <h2>Single-SPA Micro-Frontend Router Active (Router 15)</h2>
//           <p>This architecture is designed for **modular routing** and **micro-frontends**.</p>
          
//           {/* Example of a component using the SingleSpaContext */}
//           <SingleSpaStatus />

//           {/* Example of loading a micro-frontend Parcel */}
//           <ParcelComponent
//             config={DummyMicroFrontend}
//             wrapWith: 'div' 
//             handleError={console.error}
//             greeting="Hello from the Parcel!"
//           />
          
//           <p style={{ marginTop: '15px' }}>The main application routes would be defined here, often using a secondary router within the micro-frontend's boundaries.</p>
//         </div>
//       </MyContext.Provider>
//     </SingleSpaContext.Provider>
//   );
// };

// // Component to consume the SingleSpaContext
// const SingleSpaStatus = () => {
//   const context = useContext(SingleSpaContext);
//   return <p>Current App Name from Context: **{context.name}**</p>;
// };

// /**
//  * The 'singleSpaReact' function itself is usually used in a separate file (e.g., app-entry.js) 
//  * to define the lifecycle of the micro-frontend, not directly inside a component like this. 
//  * This file serves as the wrapper that renders the app's root component within the necessary context.
//  */