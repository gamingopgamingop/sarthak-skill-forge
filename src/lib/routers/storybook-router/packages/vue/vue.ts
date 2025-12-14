// Type definitions for missing modules
interface RouteLocationNormalized {
  fullPath: string;
  path?: string;
  name?: string;
  // Add other properties as needed
}

interface Router {
  push(location: any): Promise<any>;
  replace(location: any): Promise<any>;
  beforeEach(guard: Function): void;
  afterEach(hook: Function): void;
}

interface History {
  // Define history properties as needed
}

interface App {
  use(plugin: any): App;
  mount(rootContainer: Element | string): void;
  unmount(): void;
}

// Mock implementations for missing modules
const createRouter = (options: any): Router => ({
  push: (location: any) => Promise.resolve(),
  replace: (location: any) => Promise.resolve(),
  beforeEach: (guard: Function) => {},
  afterEach: (hook: Function) => {}
});

const createMemoryHistory = (): History => ({});

const createApp = (component: any): App => ({
  use: (plugin: any) => createApp(component),
  mount: (rootContainer: Element | string) => {},
  unmount: () => {}
});

// Mock for storybook addon-actions
const action = (name: string) => (data: any) => {
  console.log(`Action ${name}:`, data);
};

interface LinkObject {
  [key: string]: (path: string) => void;
}

interface RouterProps {
  initialEntry?: string;
  globalBeforeEach?: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => void;
  [key: string]: any;
}

const storyRouterDecorator = (links: LinkObject = {}, routerProps: RouterProps = {}) => {
  return (story: Function) => {
    const history = createMemoryHistory();
    const router = createRouter({
      history,
      routes: []
    });

    // Set initial entry if provided
    if (routerProps.initialEntry) {
      router.push(routerProps.initialEntry);
    } else {
      router.push('/');
    }

    const getLocation = (location: any): string => {
      // The location can be a simple string if you are using directly one of the
      // Router methods or it can be an object, having the name or the path depending if you
      // are using named routes or not.
      if (typeof location === 'object') {
        return location.path ? location.path : `name: ${location.name}`;
      }
      return location;
    };

    let replaced = false;

    // We want to log every action performed on the navigation router with the only
    // exception of links replaced with the linkTo callback.
    const originalPush = router.push.bind(router);

    router.push = (location: any): Promise<any> => {
      replaced = false;
      const result = originalPush(location);

      if (!replaced) {
        action('PUSH')(getLocation(location));
      }
      
      return result;
    };

    const originalReplace = router.replace.bind(router);

    router.replace = (location: any): Promise<any> => {
      replaced = false;
      const result = originalReplace(location);

      if (!replaced) {
        action('REPLACE')(getLocation(location));
      }
      
      return result;
    };

    if (routerProps.globalBeforeEach) {
      router.beforeEach(routerProps.globalBeforeEach);
    }

    router.afterEach((to: RouteLocationNormalized) => {
      for (const link in links) {
        if (to.fullPath === link) {
          links[link](to.fullPath);
          replaced = true;
          return;
        }
      }
    });

    const WrappedComponent = story();
    
    // Create a Vue app instance with the router
    const app = createApp(WrappedComponent);
    app.use(router);
    
    // Return the app instance
    return app;
  };
};

export default storyRouterDecorator;