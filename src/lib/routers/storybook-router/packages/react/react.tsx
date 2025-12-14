import React, { ReactNode, useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter, matchPath, useLocation } from 'react-router-dom';

interface LinkObject {
  [key: string]: (path: string) => void;
}

interface RouterProps {
  children?: ReactNode;
  links?: LinkObject;
  routerProps?: any;
}

interface HistoryWatcherProps {
  links?: LinkObject;
  children?: ReactNode;
}

const match = (link: string, path: string) => {
  // If the new path matches with one of the keys defined in the links object, then
  // executes the given corresponding callback value with the path as argument.
  // As behind the scene matchProps uses path-to-regexp (https://goo.gl/xgzOaL)
  // you can use parameter names and regexp within the link keys.
  return matchPath(link, path);
};

const HistoryWatcher: React.FC<HistoryWatcherProps> = ({ links = {}, children }) => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    
    for (const link in links) {
      if (match(path, link)) {
        links[link](path);
        return;
      }
    }
    action(location.state?.action || 'NAVIGATE')(path);
  }, [location, links]);

  return <>{children}</>;
};

const StoryRouter: React.FC<RouterProps> = ({ children, links = {}, routerProps = {} }) => (
  // Limitation: as MemoryRouter creates a new history object, you cannot pass it from
  // a story to another one and so you cannot implement a back or forward button which
  // works among stories.
  <MemoryRouter {...routerProps}>
    <HistoryWatcher links={links}>
      {children}
    </HistoryWatcher>
  </MemoryRouter>
);

const storyRouterDecorator = (links: LinkObject = {}, routerProps: any = {}) => {
  const s = (story: () => ReactNode) => (
    <StoryRouter links={links} routerProps={routerProps}>
      {story()}
    </StoryRouter>
  );
  s.displayName = 'StoryRouter';
  return s;
};

export { StoryRouter };
export type { LinkObject };

export default storyRouterDecorator;