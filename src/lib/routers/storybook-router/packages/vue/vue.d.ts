import { App } from 'vue';

export interface LinkObject {
  [key: string]: (path: string) => void;
}

export interface RouterProps {
  initialEntry?: string;
  globalBeforeEach?: (to: any, from: any, next: Function) => void;
  [key: string]: any;
}

declare function storyRouterDecorator(
  links?: LinkObject,
  routerProps?: RouterProps
): (story: Function) => App;

export default storyRouterDecorator;