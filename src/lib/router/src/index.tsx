/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useContext, createContext, useRef, useEffect, useLayoutEffect } from "react";
import invariant from "invariant";
import {
  startsWith,
  pick,
  resolve,
  match,
  insertParams,
  validateRedirect,
  shallowCompare,
  Route,
  MatchResult
} from "./lib/utils";
import {
  globalHistory,
  navigate,
  createHistory,
  createMemorySource,
  History,
  HistoryLocation
} from "./lib/history";

// Type definitions
interface LocationContextType {
  location: HistoryLocation;
  navigate: (to: string | number, options?: { state?: any; replace?: boolean }) => Promise<void>;
}

interface BaseContextType {
  baseuri: string;
  basepath: string;
  navigate: (to: string | number, options?: { state?: any; replace?: boolean }) => Promise<void>;
}

interface LocationProviderProps {
  history?: History;
  children: React.ReactNode | ((context: LocationContextType) => React.ReactNode);
}

interface LocationProviderState {
  context: LocationContextType;
  refs: { unlisten: () => void };
}

interface ServerLocationProps {
  url: string;
  children: React.ReactNode;
}

interface RouterProps {
  children: React.ReactNode;
  basepath?: string;
  primary?: boolean;
  component?: React.ComponentType<any> | string;
  location?: HistoryLocation;
}

interface RouterImplProps extends BaseContextType, RouterProps {
  basepath: string; // Explicitly define basepath as required to override optional basepath from RouterProps
  location: HistoryLocation; // Explicitly define location property
  navigate: (to: string | number, options?: { state?: any; replace?: boolean }) => Promise<void>; // Explicitly define navigate property
  [key: string]: any;
}

interface FocusHandlerProps extends React.HTMLAttributes<HTMLDivElement> {
  uri: string;
  location: HistoryLocation;
  component?: React.ComponentType<any> | string;
  [key: string]: any;
}

interface FocusHandlerImplState {
  shouldFocus?: boolean;
  uri?: string;
  location?: HistoryLocation;
  [key: string]: any;
}

interface FocusHandlerImplProps extends FocusHandlerProps {
  requestFocus: (node: HTMLElement | null) => void;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  state?: any;
  replace?: boolean;
  getProps?: (args: { isCurrent: boolean; isPartiallyCurrent: boolean; href: string; location: HistoryLocation }) => any;
  innerRef?: React.Ref<HTMLAnchorElement>;
}

interface RedirectRequest {
  uri: string;
}

interface RedirectImplProps {
  navigate: (to: string | number, options?: { state?: any; replace?: boolean }) => Promise<void>;
  to: string;
  from?: string;
  replace?: boolean;
  state?: any;
  noThrow?: boolean;
  baseuri: string;
  [key: string]: any;
}

interface RedirectProps {
  to: string;
  from?: string;
  replace?: boolean;
  state?: any;
  noThrow?: boolean;
  [key: string]: any;
}

interface MatchProps {
  path: string;
  children: (args: { 
    navigate: (to: string | number, options?: { state?: any; replace?: boolean }) => Promise<void>;
    location: HistoryLocation;
    match: MatchResult | null;
  }) => React.ReactNode;
}

interface RouteComponentProps {
  [key: string]: any;
  path?: string;
  default?: boolean;
  children?: React.ReactNode;
}

type RouteComponentType = React.ComponentType<RouteComponentProps>;

const createNamedContext = <T,>(name: string, defaultValue: T) => {
  const Ctx = createContext<T>(defaultValue);
  Ctx.displayName = name;
  return Ctx;
};

// Location Context/Provider
let LocationContext = createNamedContext<LocationContextType | null>("Location", null);

// sets up a listener if there isn't one already so apps don't need to be
// wrapped in some top level provider
let Location: React.FC<{ children: (context: LocationContextType) => React.ReactNode }> = ({ children }) => (
  <LocationContext.Consumer>
    {context =>
      context ? (
        children(context)
      ) : (
        <LocationProvider>{(contextValue: LocationContextType) => children(contextValue)}</LocationProvider>
      )
    }
  </LocationContext.Consumer>
);

class LocationProvider extends React.Component<LocationProviderProps, LocationProviderState> {
  static defaultProps = {
    history: globalHistory
  };

  unmounted = false;

  state = {
    context: this.getContext(),
    refs: { unlisten: () => {} }
  };

  getContext(): LocationContextType {
    let {
      props: {
        history = globalHistory
      }
    } = this;
    let { navigate, location } = history;
    return { navigate, location };
  }

  componentDidCatch(error: any, info: any) {
    if (isRedirect(error)) {
      let {
        props: {
          history = globalHistory
        }
      } = this;
      let { navigate } = history;
      navigate(error.uri, { replace: true });
    } else {
      throw error;
    }
  }

  componentDidUpdate(prevProps: LocationProviderProps, prevState: LocationProviderState) {
    if (prevState.context.location !== this.state.context.location) {
      this.props.history!._onTransitionComplete();
    }
  }

  componentDidMount() {
    let {
      state: { refs },
      props: { history }
    } = this;
    history!._onTransitionComplete();
    const unlisten = history!.listen(() => {
      Promise.resolve().then(() => {
        // TODO: replace rAF with react deferred update API when it's ready https://github.com/facebook/react/issues/13306
        requestAnimationFrame(() => {
          if (!this.unmounted) {
            this.setState(() => ({ context: this.getContext() }));
          }
        });
      });
    });
    refs.unlisten = unlisten ?? null;
  }

  componentWillUnmount() {
    let {
      state: { refs }
    } = this;
    this.unmounted = true;
    if (refs.unlisten) {
      refs.unlisten();
    }
  }

  render() {
    let {
      state: { context },
      props: { children }
    } = this;
    return (
      <LocationContext.Provider value={context}>
        {typeof children === "function" ? children(context) : children || null}
      </LocationContext.Provider>
    );
  }
}

let ServerLocation: React.FC<ServerLocationProps> = ({ url, children }) => {
  let searchIndex = url.indexOf("?");
  let searchExists = searchIndex > -1;
  let pathname: string;
  let search = "";
  let hash = "";

  if (searchExists) {
    pathname = url.substring(0, searchIndex);
    search = url.substring(searchIndex);
  } else {
    pathname = url;
  }

  return (
    <LocationContext.Provider
      value={{
        location: {
          pathname,
          search,
          hash
        } as HistoryLocation,
        navigate: () => {
          throw new Error("You can't call navigate on the server.");
        }
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

// Sets baseuri and basepath for nested routers and links
let BaseContext = createNamedContext<BaseContextType>("BaseContext", {
  baseuri: "/",
  basepath: "/",
  navigate: globalHistory.navigate
});

// The main event, welcome to the show everybody.
let Router: React.FC<RouterProps> = props => (
  <BaseContext.Consumer>
    {baseContext => (
      <Location>
        {locationContext => (
          <RouterImpl {...baseContext} {...locationContext} {...props} />
        )}
      </Location>
    )}
  </BaseContext.Consumer>
);

class RouterImpl extends React.PureComponent<RouterImplProps> {
  static defaultProps = {
    primary: true
  };

  render() {
    let {
      location,
      navigate,
      basepath = "",
      primary,
      children,
      baseuri,
      component = "div",
      ...domProps
    } = this.props;
    let routes = React.Children.toArray(children).reduce((array: Route[], child) => {
      const routes = createRoute(basepath)(child);
      return routes ? array.concat(routes) : array;
    }, []);
    let { pathname } = location;

    let match = pick(routes, pathname);

    if (match) {
      let {
        params,
        uri,
        route,
        route: { value: element }
      } = match;

      // remove the /* from the end for child routes relative paths
      basepath = route.default ? basepath : route.path.replace(/\*$/, "");

      let props = {
        ...params,
        uri,
        location,
        navigate: (to: string | number, options?: { state?: any; replace?: boolean }) => navigate(resolve(to as string, uri), options)
      };

      let clone = React.cloneElement(
        element,
        props,
        element.props.children ? (
          <Router primary={primary}>
            {element.props.children}
          </Router>
        ) : (
          undefined
        )
      );

      // using 'div' for < 16.3 support
      let FocusWrapper: any = primary ? FocusHandler : component;
      // don't pass any props to 'div'
      let wrapperProps = primary
        ? { uri, location, component, ...domProps }
        : domProps;

      return (
        <BaseContext.Provider
          value={{ baseuri: uri, basepath, navigate: props.navigate }}
        >
          <FocusWrapper {...wrapperProps}>{clone}</FocusWrapper>
        </BaseContext.Provider>
      );
    } else {
    //   Not sure if we want this, would require index routes at every level
      console.warn(
        `<Router basepath="${basepath}">\n\nNothing matched:\n\t${
          location.pathname
        }\n\nPaths checked: \n\t${routes
          .map(route => route.path)
          .join(
            "\n\t"
          )}\n\nTo get rid of this warning, add a default NotFound component as child of Router:
        \n\tlet NotFound = () => <div>Not Found!</div>
        
\t<Router>
\t  <NotFound default/>
\t  {/* ... */}
\t</Router>`
      );
      return null;
    }
  }
}

let FocusContext = createNamedContext<(node: HTMLElement | null) => void>("Focus", () => {});

let FocusHandler: React.FC<FocusHandlerProps> = ({ uri, location, component, ...domProps }) => (
  <FocusContext.Consumer>
    {requestFocus => (
      <FocusHandlerImpl
        {...domProps}
        component={component}
        requestFocus={requestFocus}
        uri={uri}
        location={location}
      />
    )}
  </FocusContext.Consumer>
);

// don't focus on initial render
let initialRender = true;
let focusHandlerCount = 0;

class FocusHandlerImpl extends React.Component<FocusHandlerImplProps, FocusHandlerImplState> {
  node: HTMLElement | null = null;

  state: FocusHandlerImplState = {};

  static getDerivedStateFromProps(nextProps: FocusHandlerImplProps, prevState: FocusHandlerImplState) {
    let initial = prevState.uri == null;
    if (initial) {
      return {
        shouldFocus: true,
        ...nextProps
      };
    } else {
      let myURIChanged = nextProps.uri !== prevState.uri;
      let navigatedUpToMe =
        prevState.location!.pathname !== nextProps.location.pathname &&
        nextProps.location.pathname === nextProps.uri;
      return {
        shouldFocus: myURIChanged || navigatedUpToMe,
        ...nextProps
      };
    }
  }

  componentDidMount() {
    focusHandlerCount++;
    this.focus();
  }

  componentWillUnmount() {
    focusHandlerCount--;
    if (focusHandlerCount === 0) {
      initialRender = true;
    }
  }

  componentDidUpdate(prevProps: FocusHandlerImplProps, prevState: FocusHandlerImplState) {
    if (prevProps.location !== this.props.location && this.state.shouldFocus) {
      this.focus();
    }
  }

  focus() {
    if (process.env.NODE_ENV === "test") {
      // getting cannot read property focus of null in the tests
      // and that bit of global `initialRender` state causes problems
      // should probably figure it out!
      return;
    }

    let { requestFocus } = this.props;

    if (requestFocus) {
      requestFocus(this.node);
    } else {
      if (initialRender) {
        initialRender = false;
      } else if (this.node) {
        // React polyfills [autofocus] and it fires earlier than cDM,
        // so we were stealing focus away, this line prevents that.
        if (!this.node.contains(document.activeElement)) {
          this.node.focus();
        }
      }
    }
  }

  requestFocus = (node: HTMLElement | null) => {
    if (!this.state.shouldFocus && node) {
      node.focus();
    }
  };

  render() {
    let {
      children,
      style,
      requestFocus,
      component: Comp = "div",
      uri,
      location,
      ...domProps
    } = this.props;

    return (
      <Comp
        style={{ outline: "none", ...style }}
        tabIndex={-1}
        ref={(n: HTMLElement | null) => (this.node = n)}
        {...domProps}
      >
        <FocusContext.Provider value={this.requestFocus}>
          {this.props.children}
        </FocusContext.Provider>
      </Comp>
    );
  }
}

let k = () => {};

let { forwardRef } = React;
if (typeof forwardRef === "undefined") {
  forwardRef = (C: any) => C;
}

let Link = forwardRef<HTMLAnchorElement, LinkProps>(({ innerRef, ...props }, ref) => (
  <BaseContext.Consumer>
    {({ basepath, baseuri }) => (
      <Location>
        {({ location, navigate }) => {
          let { to, state, replace, getProps = k, ...anchorProps } = props;
          let href = resolve(to, baseuri);
          let encodedHref = encodeURI(href);
          let isCurrent = location.pathname === encodedHref;
          let isPartiallyCurrent = startsWith(location.pathname, encodedHref);

          return (
            <a
              ref={ref || innerRef}
              aria-current={isCurrent ? "page" : undefined}
              {...anchorProps}
              {...getProps({ isCurrent, isPartiallyCurrent, href, location })}
              href={href}
              onClick={event => {
                if (anchorProps.onClick) anchorProps.onClick(event);
                if (shouldNavigate(event)) {
                  event.preventDefault();
                  let shouldReplace = replace;
                  if (typeof replace !== "boolean" && isCurrent) {
                    const { key, ...restState } = { ...location.state };
                    shouldReplace = shallowCompare({ ...state }, restState);
                  }
                  navigate(href, {
                    state,
                    replace: shouldReplace
                  });
                }
              }}
            />
          );
        }}
      </Location>
    )}
  </BaseContext.Consumer>
));

Link.displayName = "Link";

////////////////////////////////////////////////////////////////////////////////
class RedirectRequest {
  uri: string;
  
  constructor(uri: string) {
    this.uri = uri;
  }
}

let isRedirect = (o: any): o is RedirectRequest => o instanceof RedirectRequest;

let redirectTo = (to: string) => {
  throw new RedirectRequest(to);
};

class RedirectImpl extends React.Component<RedirectImplProps> {
  // Support React < 16 with this hook
  componentDidMount() {
    let {
      props: {
        navigate,
        to,
        from,
        replace = true,
        state,
        noThrow,
        baseuri,
        ...props
      }
    } = this;
    Promise.resolve().then(() => {
      let resolvedTo = resolve(to, baseuri);
      navigate(insertParams(resolvedTo, props), { replace, state });
    });
  }

  render() {
    let {
      props: { navigate, to, from, replace, state, noThrow, baseuri, ...props }
    } = this;
    let resolvedTo = resolve(to, baseuri);
    if (!noThrow) redirectTo(insertParams(resolvedTo, props));
    return null;
  }
}

let Redirect: React.FC<RedirectProps> = props => (
  <BaseContext.Consumer>
    {({ baseuri }) => (
      <Location>
        {locationContext => (
          <RedirectImpl {...locationContext} baseuri={baseuri} {...props} />
        )}
      </Location>
    )}
  </BaseContext.Consumer>
);

////////////////////////////////////////////////////////////////////////////////
let Match: React.FC<MatchProps> = ({ path, children }) => (
  <BaseContext.Consumer>
    {({ baseuri }) => (
      <Location>
        {({ navigate, location }) => {
          let resolvedPath = resolve(path, baseuri);
          let result = match(resolvedPath, location.pathname);
          return children({
            navigate,
            location,
            match: result
          });
        }}
      </Location>
    )}
  </BaseContext.Consumer>
);

////////////////////////////////////////////////////////////////////////////////
// Hooks

const useLocation = (): HistoryLocation => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error(
      "useLocation hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router"
    );
  }

  return context.location;
};

const useNavigate = () => {
  const context = useContext(BaseContext);

  if (!context) {
    throw new Error(
      "useNavigate hook was used but a BaseContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router"
    );
  }

  return context.navigate;
};

const useParams = <T extends { [K in keyof T]?: string }>(): T | null => {
  const context = useContext(BaseContext);

  if (!context) {
    throw new Error(
      "useParams hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router"
    );
  }

  const location = useLocation();

  const results = match(context.basepath, location.pathname);

  return results ? results.params as T : null;
};

const useMatch = <T extends { [K in keyof T]?: string }>(path: string): (T & { uri: string; path: string }) | null => {
  if (!path) {
    throw new Error(
      "useMatch(path: string) requires an argument of a string to match against"
    );
  }
  const context = useContext(BaseContext);

  if (!context) {
    throw new Error(
      "useMatch hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router"
    );
  }

  const location = useLocation();

  const resolvedPath = resolve(path, context.baseuri);
  const result = match(resolvedPath, location.pathname);
  return result
    ? {
        ...result.params,
        uri: result.uri,
        path
      } as T & { uri: string; path: string }
    : null;
};

////////////////////////////////////////////////////////////////////////////////
// Junk
let stripSlashes = (str: string) => str.replace(/(^\/+|\/+$)/g, "");

let createRoute = (basepath: string) => (element: React.ReactNode): Route | Route[] | null => {
  if (!element) {
    return null;
  }

  if (React.isValidElement(element) && element.type === React.Fragment && (element.props as any).children) {
    const mapped = React.Children.map((element.props as any).children, createRoute(basepath));
    return mapped ? mapped.flat() : null;
  }
  
  if (!React.isValidElement(element)) {
    return null;
  }

  const el = element as React.ReactElement<RouteComponentProps>;
  
  invariant(
    el.props.path || el.props.default || el.type === Redirect,
    `<Router>: Children of <Router> must have a \`path\` or \`default\` prop, or be a \`<Redirect>\`. None found on element type \`${el.type}\``
  );

  invariant(
    !(el.type === Redirect && (!el.props.from || !el.props.to)),
    `<Redirect from="${el.props.from}" to="${el.props.to}"/> requires both "from" and "to" props when inside a <Router>.`
  );

  invariant(
    !(
      el.type === Redirect &&
      !validateRedirect(el.props.from!, el.props.to!)
    ),
    `<Redirect from="${el.props.from} to="${el.props.to}"/> has mismatched dynamic segments, ensure both paths have the exact same dynamic segments.`
  );

  if (el.props.default) {
    return { value: el, default: true, path: "" };
  }

  let elementPath =
    el.type === Redirect ? el.props.from : el.props.path;

  let path =
    elementPath === "/"
      ? basepath
      : `${stripSlashes(basepath)}/${stripSlashes(elementPath!)}`;

  return {
    value: el,
    default: el.props.default,
    path: el.props.children ? `${stripSlashes(path)}/*` : path
  };
};

let shouldNavigate = (event: React.MouseEvent<HTMLAnchorElement>) =>
  !event.defaultPrevented &&
  event.button === 0 &&
  !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

////////////////////////////////////////////////////////////////////////
export {
  Link,
  Location,
  LocationProvider,
  Match,
  Redirect,
  Router,
  ServerLocation,
  createHistory,
  createMemorySource,
  isRedirect,
  navigate,
  redirectTo,
  globalHistory,
  match as matchPath,
  useLocation,
  useNavigate,
  useParams,
  useMatch
};