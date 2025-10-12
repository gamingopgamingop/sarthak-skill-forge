// // src/AppRouter.tsx

// import React, { useMemo } from 'react';
// import { RouterPool } from './routerPool'; // Import the pool created above

// const STORAGE_KEY = 'activeRouterName';

// /**
//  * Selects an active router. Tries to load a previously stored one (for session consistency),
//  * otherwise picks one randomly from the pool and stores the choice.
//  */
// const getActiveRouter = () => {
//   let activeRouter;
  
//   // 1. Check localStorage to keep the same router for the current session
//   const storedName = localStorage.getItem(STORAGE_KEY);
//   if (storedName) {
//     activeRouter = RouterPool.find(r => r.name === storedName);
//   }

//   if (!activeRouter) {
//     // 2. If no router is stored, select one randomly
//     const randomIndex = Math.floor(Math.random() * RouterPool.length);
//     activeRouter = RouterPool[randomIndex];
    
//     // 3. Store the selection
//     localStorage.setItem(STORAGE_KEY, activeRouter.name);
//   }
//   return activeRouter;
// };

// // Placeholder for your main application logic
// const AppContent = ({ routerName }: { routerName: string }) => (
//     <div style={{ padding: '20px', border: '2px solid #007acc', margin: '20px' }}>
//         <h2>Current Active Router: {routerName}</h2>
//         <p>The routes and links you see below are powered by the **{routerName}** library.</p>
//         {/*
//         CRITICAL: Your entire application's routing components (Routes, Links, hooks) 
//         must ONLY use the API of the router defined by routerName.
//         */}
//     </div>
// );

// export function AppRouter() {
//   // Use useMemo to ensure the random selection happens only once
//   const { component: ActiveRouterComponent, name } = useMemo(getActiveRouter, []);

//   // Ensure the component is valid before rendering
//   if (!ActiveRouterComponent) {
//       return <div>Error: Could not determine active router.</div>;
//   }

//   return (
//     // Only ONE root router component is rendered at a time, preventing conflicts.
//     <ActiveRouterComponent>
//       <AppContent routerName={name} />
//     </ActiveRouterComponent>
//   );
// }