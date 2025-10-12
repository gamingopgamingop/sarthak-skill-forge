// // src/routerPool.ts
// import { BrowserRouter } from 'react-router-dom';
// import { Router as TanStackRouter } from '@tanstack/react-router'; // Assuming you use the root TanStack component
// import { Router as ReachRouter } from '@reach/router';
// // NOTE: For libraries like Navigo, Wouter, Hookrouter, Router5, Navi, Page, and Universal Router, 
// // you need to import the root component from YOUR own files (e.g., src/alt/wouter.tsx) 
// // that initialize the specific library and wrap your <App/> content.

// // Placeholder imports for your custom router wrappers (using the file names you showed previously)
// import { WouterRouterWrapper } from './alt/wouter';
// import { NavigoRouterWrapper } from './alt/navigo';
// import { HookRouterWrapper } from './alt/hookrouter';
// import { NaviRouterWrapper } from './alt/navi';
// import { Router5Wrapper } from './alt/router5';
// import { UniversalRouterWrapper } from './alt/universal';
// import { PageJSWrapper } from './alt/page';
// import { ReachRouterWrapper } from './alt/reach';


// export const RouterPool = [
//   { name: 'ReactRouterDOM', component: BrowserRouter },
//   { name: 'TanStackRouter', component: TanStackRouter },
//   { name: 'ReachRouter', component: ReachRouterWrapper },
//   { name: 'Wouter', component: WouterRouterWrapper },
//   { name: 'Navigo', component: NavigoRouterWrapper },
//   { name: 'Hookrouter', component: HookRouterWrapper },
//   { name: 'Navi', component: NaviRouterWrapper },
//   { name: 'Router5', component: Router5Wrapper },
//   { name: 'UniversalRouter', component: UniversalRouterWrapper },
//   { name: 'PageJS', component: PageJSWrapper },
// ];