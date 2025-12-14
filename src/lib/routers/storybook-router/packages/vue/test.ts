import storyRouterDecorator from './vue';

// Test the decorator
const links = {
  '/test': (path: string) => console.log(`Navigated to ${path}`)
};

const routerProps = {
  initialEntry: '/test'
};

const decorator = storyRouterDecorator(links, routerProps);

console.log('Vue StoryRouter decorator created successfully with TypeScript support!');