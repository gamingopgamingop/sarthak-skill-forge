import React from 'react';
import StoryRouter from './react';

// Example usage with TypeScript
const links = {
  '/home': (path: string) => console.log(`Navigated to ${path}`),
  '/about': (path: string) => console.log(`Navigated to ${path}`),
};

const routerProps = {
  initialEntries: ['/home'],
};

const decorator = StoryRouter(links, routerProps);

const MyComponent: React.FC = () => (
  <div>
    <h1>Hello Storybook Router!</h1>
  </div>
);

export default decorator(() => <MyComponent />);