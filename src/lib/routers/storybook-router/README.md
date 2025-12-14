# Storybook Router Module for Portfolio Website

This is a custom implementation of the Storybook Router decorator developed by Sarthak Bansal for use in his personal portfolio website. It enables routing-aware components in Storybook stories with TypeScript support.

## Overview

This Storybook Router module is a customized implementation of a Storybook decorator that allows routing-aware components to be used in Storybook stories. It's integrated into Sarthak Bansal's personal portfolio website to demonstrate component development with routing capabilities.

## Features

- **Storybook Integration**: Seamlessly integrates routing capabilities into Storybook stories
- **Decorator Pattern**: Uses a decorator approach for easy integration
- **TypeScript Support**: Full TypeScript definitions for enhanced development experience
- **React Router Compatible**: Works with React Router v6
- **Action Logging**: Automatically logs route actions using Storybook's action logger

## Portfolio Implementation

This module is integrated into Sarthak Bansal's personal portfolio website to demonstrate:
- Component development with routing
- Storybook integration techniques
- TypeScript usage in component libraries
- Modern React development practices

## Usage

### Basic Setup

```tsx
import StoryRouter from 'storybook-router';

storiesOf('Navigation', module)
  .addDecorator(StoryRouter())
  .add('navbar', () => <Navbar />);
```

### With Route Callbacks

```tsx
import StoryRouter from 'storybook-router';
import { linkTo } from '@storybook/addon-links';

const links = {
  '/about': linkTo('Pages', 'about'),
  '/projects': linkTo('Pages', 'projects'),
  '/contact': linkTo('Pages', 'contact')
};

storiesOf('Navigation', module)
  .addDecorator(StoryRouter(links))
  .add('navbar', () => <Navbar />);
```

### With Initial Route

```tsx
import StoryRouter from 'storybook-router';

const routerProps = {
  initialEntries: ['/projects/123']
};

storiesOf('Project Detail', module)
  .addDecorator(StoryRouter({}, routerProps))
  .add('detail view', () => <ProjectDetail />);
```

## API

### StoryRouter(links, routerProps)

The main decorator function that wraps your stories with routing capabilities.

**Parameters:**

- `links` (Object): An object where keys are route patterns and values are callback functions
- `routerProps` (Object): Props forwarded to the MemoryRouter component

### Links Object

The links object allows you to map route patterns to callback functions:

```tsx
const links = {
  '/projects/:id': (path) => console.log(`Navigated to project: ${path}`),
  '/about': () => linkTo('Pages', 'about')
};
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## About This Module

This Storybook Router module is part of Sarthak Bansal's personal portfolio website implementation, showcasing proficiency in:
- Storybook addon development
- React Router integration
- Component library architecture
- TypeScript usage in component development
- Modern JavaScript/ES6+ features

It serves as both a functional component of the portfolio's development workflow and a demonstration of technical skills.

## Public Repository

This code is part of a public GitHub repository showcasing Sarthak Bansal's frontend development skills. You can view the full portfolio repository to see how this module integrates with the Storybook setup and other components.

## License

MIT

## Author

**Sarthak Bansal**

This module is part of a personal portfolio website hosted in a public repository for demonstration purposes.