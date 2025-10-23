// // src/alt/single_spa_devtools.js

// // must be called "devtools" for the single-spa-devtools extension to recognize it
// export const devtools = {
//   overlays: {
//     // selectors is required for overlays to work
//     selectors: [
//       // an array of CSS selector strings, meant to be unique ways to identify the outermost container of your app
//       "#micro-frontend-container-app1",
//     ],
//     // options is optional
//     options: {
//       // these options allow you some control over how the overlay div looks/behaves
//       zIndex: 40,
//       color: "#FFFFFF",
//       background: "rgba(0, 150, 200, 0.7)", 
//       textBlocks: [
//         'Single-SPA Lifecycle Demo App', 
//         'Router Pool Experiment',
//       ],
//     },
//   },
// };