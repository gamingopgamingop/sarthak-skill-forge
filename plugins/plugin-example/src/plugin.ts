import type { MotiaPlugin, MotiaPluginContext } from '@motiadev/core'
 
export default function plugin(motia: MotiaPluginContext): MotiaPlugin {
  return {
    workbench: [
      {
        packageName: '@motiadev/plugin-example',
        cssImports: ['@motiadev/plugin-example/dist/plugin-example.css'],
        label: 'Example',
        position: 'bottom',
        componentName: 'ExamplePage',
        labelIcon: 'sparkles',
      },
    ],
  }
}