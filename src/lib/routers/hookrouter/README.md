# HookRouter Module for Portfolio Website

This is a custom implementation of the HookRouter library developed by Sarthak Bansal for use in his personal portfolio website. It demonstrates modern React routing techniques using hooks with TypeScript support.

## Overview

This HookRouter module is a customized implementation of client-side routing for React applications using hooks, used in Sarthak Bansal's personal portfolio website. It was originally based on the [HookRouter](https://github.com/Paratron/hookrouter) library but has been tailored specifically for portfolio use.

## Features

- **Hook-Based Routing**: Uses React hooks for routing instead of components
- **Lightweight**: Minimal footprint suitable for portfolio websites
- **Easy to Use**: Simple API with intuitive hook patterns
- **Flexible**: Supports dynamic routes, query parameters, and redirects

## Portfolio Implementation

This module is integrated into Sarthak Bansal's personal portfolio website to demonstrate:
- Modern React hooks usage
- Client-side routing implementation
- Component architecture and design patterns

## Key Hooks

### useRoutes
The main hook for defining routes and their corresponding components.

```jsx
import { useRoutes } from 'hookrouter';

const routes = {
  '/': () => <Home />,
  '/projects': () => <Projects />,
  '/contact': () => <Contact />,
  '/project/:id': ({ id }) => <ProjectDetail id={id} />
};

const Main = () => {
  const routeResult = useRoutes(routes);
  return routeResult || <NotFound />;
};
```

### usePath
Hook to access the current path.

```jsx
import { usePath } from 'hookrouter';

const Navigation = () => {
  const currentPath = usePath();
  // Use currentPath to highlight active navigation items
  return <nav>...</nav>;
};
```

### navigate
Programmatic navigation function.

```jsx
import { navigate } from 'hookrouter';

const ProjectCard = ({ projectId }) => {
  const handleClick = () => {
    navigate(`/project/${projectId}`);
  };
  
  return <button onClick={handleClick}>View Project</button>;
};
```

### A
Special anchor component for navigation.

```jsx
import { A } from 'hookrouter';

const Navigation = () => (
  <nav>
    <A href="/">Home</A>
    <A href="/projects">Projects</A>
    <A href="/contact">Contact</A>
  </nav>
);
```

### useQueryParams
Hook to access query parameters.

```jsx
import { useQueryParams } from 'hookrouter';

const SearchResults = () => {
  const { q: query, page = 1 } = useQueryParams();
  // Use query parameters for filtering/searching
  return <Results query={query} page={page} />;
};
```

### useRedirect
Hook for conditional redirects.

```jsx
import { useRedirect } from 'hookrouter';

const App = () => {
  // Redirect from old URL to new URL
  useRedirect('/old-portfolio', '/projects');
  
  return (
    // ... rest of app
  );
};
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## About This Module

This HookRouter module is part of Sarthak Bansal's personal portfolio website implementation, showcasing proficiency in:
- React hooks usage
- Client-side routing implementation
- Modern JavaScript/ES6+ features
- Functional programming patterns

It serves as both a functional component of the portfolio and a demonstration of technical skills.

## Public Repository

This code is part of a public GitHub repository showcasing Sarthak Bansal's frontend development skills. You can view the full portfolio repository to see how this module integrates with other components.

## License

MIT

## Author

**Sarthak Bansal**

This module is part of a personal portfolio website hosted in a public repository for demonstration purposes.