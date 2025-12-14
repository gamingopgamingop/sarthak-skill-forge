import { ComponentType, ReactNode } from 'react';

export interface LinkObject {
  [key: string]: (path: string) => void;
}

export interface StoryRouterProps {
  children?: ReactNode;
  links?: LinkObject;
  routerProps?: any;
}

export const StoryRouter: ComponentType<StoryRouterProps>;

declare function storyRouterDecorator(
  links?: LinkObject,
  routerProps?: any
): (story: () => ReactNode) => ReactNode;

export default storyRouterDecorator;