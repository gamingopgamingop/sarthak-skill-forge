// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// // import { TanStackRouter } from '@tanstack/react-router'; // Note: TanStack is route-based, often needs special setup.

// // --- Imports for your custom router wrappers from src/alt ---
// // Assuming these files contain wrapper components that implement the specific router's logic
// // and render your app's pages inside the router's context/provider.
// import { ReachRouterWrapper } from './alt/reach';
// import { WouterRouterWrapper } from './alt/wouter';
// import { NavigoRouterWrapper } from './alt/navigo';
// import { HookRouterWrapper } from './alt/hookrouter';
// import { NaviRouterWrapper } from './alt/navi';
// import { Router5Wrapper } from './alt/router5';
// import { UniversalRouterWrapper } from './alt/universal';

// // For Page.js, the implementation is often command-based, so the wrapper is crucial.
// import { PageJSWrapper } from './alt/page';

// // Placeholder for the TanStack Router component, often exported as a specific setup
// // export const TanStackRouterWrapper = () => <TanStackRouter router={/* your router instance */} />;
// // For simplicity in this config, we'll keep the direct wrappers.

// // You must create a wrapper component for any router that requires setup (which is most of them).
// const DefaultWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
//     <>{children}</>
// );

// // --- The Router Pool Array ---
// // This is the registry of all available routers.
// export const RouterPool = [
//   // 1. react-router-dom (Standard React Router Provider)
//   { 
//     name: 'ReactRouterDOM', 
//     component: BrowserRouter, 
//     description: 'The standard declarative router. Uses <BrowserRouter>.' 
//   },
  
//   // 2. Wouter (Minimalist, Context-based)
//   { 
//     name: 'Wouter', 
//     component: WouterRouterWrapper, // Must be your component that renders <Router> and pages
//     description: 'A tiny, minimalist router for React.' 
//   },
  
//   // 3. Reach Router (Older but still used, often simple context wrapper)
//   { 
//     name: 'ReachRouter', 
//     component: ReachRouterWrapper, 
//     description: 'A router focused on accessibility (used in your project files).' 
//   },
  
//   // 4. Navigo (JavaScript router, requires a React wrapper)
//   { 
//     name: 'Navigo', 
//     component: NavigoRouterWrapper, 
//     description: 'A standalone JS router, wrapped for React.' 
//   },
  
//   // 5. Hookrouter (Hook-based alternative)
//   { 
//     name: 'Hookrouter', 
//     component: HookRouterWrapper, 
//     description: 'A simple, hook-based React router.' 
//   },
  
//   // 6. Router5 (State management approach, requires a provider wrapper)
//   { 
//     name: 'Router5', 
//     component: Router5Wrapper, 
//     description: 'A state machine approach to routing.' 
//   },
  
//   // 7. Navi (Async router, requires a provider wrapper)
//   { 
//     name: 'Navi', 
//     component: NaviRouterWrapper, 
//     description: 'A powerful, asynchronous router.' 
//   },
  
//   // 8. Universal Router (Often used for SSR, requires specific setup)
//   { 
//     name: 'UniversalRouter', 
//     component: UniversalRouterWrapper, 
//     description: 'A simple, universal router with server support.' 
//   },
  
//   // 9. Page.js (Micro-router, typically wrapper is needed)
//   { 
//     name: 'PageJS', 
//     component: PageJSWrapper, 
//     description: 'A tiny micro-router inspired by Express.' 
//   },
  
//   // 10. TanStack Router (Modern, file-based, requires specific setup)
//   // { 
//   //   name: 'TanStackRouter', 
//   //   component: TanStackRouterWrapper, 
//   //   description: 'A modern, type-safe, and data-aware router.' 
//   // },
// ];

// /**
//  * Note: To correctly use this config, you must ensure that all wrapper components 
//  * (e.g., WouterRouterWrapper, NavigoRouterWrapper, etc.) are correctly implemented
//  * in your src/alt directory and render the SAME set of application pages using 
//  * the specific API of the router they encapsulate.
//  */