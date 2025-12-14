# @reach/router

Next generation Routing for React, modernized for React 19 with full TypeScript support.

## Overview

This is a modernized fork of [@reach/router](https://github.com/reach/router) that has been upgraded to be compatible with React 19 and converted to TypeScript. It maintains backward compatibility with React 15 and 16 while adding full type safety and modern build tooling.

## Features

- **React 19 Compatible**: Fully compatible with the latest React features and APIs
- **TypeScript Support**: Complete TypeScript definitions for all components and hooks
- **Backward Compatible**: Works with React 15, 16, and 19
- **Lightweight**: Minimal footprint with no external dependencies
- **Accessible**: Built with accessibility in mind
- **Simple API**: Easy-to-use routing components

## Installation

```bash
npm install @reach/router
```

or

```bash
yarn add @reach/router
```

## Quick Start

```jsx
import React from "react";
import { Router, Link } from "@reach/router";

const Home = () => <div>Home</div>;
const About = () => <div>About</div>;
const NotFound = () => <div>404 - Not Found</div>;

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      
      <Router>
        <Home path="/" />
        <About path="/about" />
        <NotFound default />
      </Router>
    </div>
  );
}

export default App;
```

## Key Components

### Router
The main router component that manages routing state.

```jsx
<Router>
  <Home path="/" />
  <User path="/user/:userId" />
  <NotFound default />
</Router>
```

### Link
A navigational component that uses the router.

```jsx
<Link to="/user/123">User Profile</Link>
<Link to="/search" state={{ query: "react" }}>Search</Link>
```

### Redirect
Programmatically redirect from one route to another.

```jsx
<Redirect from="/old" to="/new" />
<Redirect from="/users/:userId" to="/profile/:userId" />
```

### Match
Component for conditionally rendering based on a route.

```jsx
<Match path="/user/:userId">
  {props => props.match ? <UserProfile {...props} /> : <div>Not matched</div>}
</Match>
```

## Hooks

### useLocation
Access the current location object.

```jsx
import { useLocation } from "@reach/router";

function Component() {
  const location = useLocation();
  // location.pathname, location.search, etc.
  return <div>Current path: {location.pathname}</div>;
}
```

### useNavigate
Get a function for navigating programmatically.

```jsx
import { useNavigate } from "@reach/router";

function Component() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/somewhere");
    // or with options
    navigate("/somewhere", { replace: true });
  };
  
  return <button onClick={handleClick}>Go</button>;
}
```

### useParams
Access route parameters.

```jsx
import { useParams } from "@reach/router";

// For route /user/:userId/posts/:postId
function Component() {
  const { userId, postId } = useParams();
  return <div>User {userId}, Post {postId}</div>;
}
```

### useMatch
Match a route pattern.

```jsx
import { useMatch } from "@reach/router";

function Component() {
  const match = useMatch("/user/:userId");
  if (match) {
    return <div>User ID: {match.userId}</div>;
  }
  return <div>No match</div>;
}
```

## Modernization Details

This version of @reach/router has been modernized with the following improvements:

1. **TypeScript Conversion**: Full conversion to TypeScript with comprehensive type definitions
2. **React 19 Compatibility**: Updated to work with React 19 while maintaining backward compatibility
3. **Modern Build System**: Updated build tools including Babel 7 and modern Rollup plugins
4. **Removed Legacy Dependencies**: Eliminated outdated polyfills and dependencies not needed in modern React
5. **Improved Developer Experience**: Better error messages and tooling support

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## Development

### Install Dependencies

```bash
yarn install
```

### Build

```bash
yarn build
```

### Test

```bash
yarn test
```

### Watch Mode

```bash
yarn watch
```

## License

MIT © Ryan Florence

## Acknowledgements

This project is a modernized fork of the original [@reach/router](https://github.com/reach/router) by Ryan Florence. We thank the original author and contributors for their excellent work.