type MotiaPlugin = {
  workbench: WorkbenchPlugin[]  // Array of workbench tab configurations
  dirname?: string              // Optional plugin directory
  steps?: string[]              // Optional custom steps
}

type WorkbenchPlugin = {
  packageName: string           // Package registry name (e.g., '@motiadev/plugin-example')
  componentName?: string        // React component name to render
  label?: string                // Tab label text
  labelIcon?: string            // Icon name from lucide-react
  position?: 'bottom' | 'top'   // Tab position in workbench
  cssImports?: string[]         // CSS files to import
  props?: Record<string, any>   // Props passed to component
}

type MotiaPluginContext = {
  printer: Printer              // Logging utilities
  state: StateAdapter           // State management
  lockedData: LockedData        // Thread-safe data access
  tracerFactory: TracerFactory  // Tracing functionality
  registerApi: (...)            // Register custom API endpoints
}