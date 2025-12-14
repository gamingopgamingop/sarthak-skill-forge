# Router Module for Portfolio Website

This is a custom routing module developed by Sarthak Bansal for use in his personal portfolio website. It demonstrates modern React routing techniques with TypeScript support.

## Overview

This routing module is a customized implementation of client-side routing for React applications, used in Sarthak Bansal's personal portfolio website. It was originally based on [@reach/router](https://github.com/reach/router) concepts but has been tailored specifically for portfolio use with TypeScript support for improved type safety.

## Features

- **React Compatible**: Designed for modern React applications
- **TypeScript Support**: Complete TypeScript definitions for all components and hooks
- **Lightweight**: Minimal footprint suitable for portfolio websites
- **Accessible**: Built with accessibility in mind
- **Simple API**: Easy-to-use routing components

## Portfolio Implementation

This module is integrated into Sarthak Bansal's personal portfolio website to demonstrate:
- Modern React development practices
- TypeScript integration with React components
- Client-side routing implementation
- Component architecture and design patterns

## Key Components

### Router
The main router component that manages routing state.

```jsx
<Router>
  <Home path="/" />
  <Projects path="/projects" />
  <Contact path="/contact" />
  <NotFound default />
</Router>
```

### Link
Navigation component for portfolio pages.

```jsx
<Link to="/projects">View Projects</Link>
<Link to="/contact" state={{ from: "header" }}>Contact Me</Link>
```

### Redirect
Handle navigation redirects within the portfolio.

```jsx
<Redirect from="/old-portfolio" to="/projects" />
```

## Hooks

### useLocation
Access the current location for analytics or UI updates.

```jsx
import { useLocation } from "@reach/router";

function PortfolioHeader() {
  const location = useLocation();
  // Highlight active navigation based on current path
  return <Navigation currentPath={location.pathname} />;
}
```

### useNavigate
Programmatic navigation for portfolio interactions.

```jsx
import { useNavigate } from "@reach/router";

function ProjectCard({ projectId }) {
  const navigate = useNavigate();
  
  const viewDetails = () => {
    navigate(`/projects/${projectId}`);
  };
  
  return <button onClick={viewDetails}>View Details</button>;
}
```

### useParams
Access route parameters for dynamic portfolio content.

```jsx
import { useParams } from "@reach/router";

function ProjectDetail() {
  const { projectId } = useParams();
  // Display project details based on projectId
  return <ProjectDisplay id={projectId} />;
}
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## About This Module

This routing module is part of Sarthak Bansal's personal portfolio website implementation, showcasing proficiency in:
- React component development
- TypeScript integration
- Frontend architecture
- Modern JavaScript/ES6+ features

It serves as both a functional component of the portfolio and a demonstration of technical skills.

## Public Repository

This code is part of a public GitHub repository showcasing Sarthak Bansal's frontend development skills. You can view the full portfolio repository to see how this module integrates with other components.

## License

MIT

## Author

**Sarthak Bansal**

This module is part of a personal portfolio website hosted in a public repository for demonstration purposes.