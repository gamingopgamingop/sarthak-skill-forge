// Type definitions
export interface HistorySource {
  location: Location;
  history: {
    state: any;
    go(to: number): void;
    pushState(state: any, _: any, uri: string): void;
    replaceState(state: any, _: any, uri: string): void;
  };
  addEventListener(name: string, fn: () => void): void;
  removeEventListener(name: string, fn: () => void): void;
}

export interface HistoryLocation extends Location {
  state: any;
  key: string;
}

export interface Location {
  pathname: string;
  search: string;
  hash: string;
  href: string;
  origin: string;
  protocol: string;
  host: string;
  hostname: string;
  port: string;
}

export interface History {
  location: HistoryLocation;
  transitioning: boolean;
  _onTransitionComplete(): void;
  listen(listener: (params: { location: HistoryLocation; action: string }) => void): () => void;
  navigate(to: string | number, options?: { state?: any; replace?: boolean }): Promise<void>;
}

export const getLocation = (source: HistorySource): HistoryLocation => {
  const {
    search,
    hash,
    href,
    origin,
    protocol,
    host,
    hostname,
    port
  } = source.location;
  let { pathname } = source.location;

  if (!pathname && href && canUseDOM) {
    const url = new URL(href);
    pathname = url.pathname;
  }
  
  const encodedPathname = pathname
  .split("/")
  .map(pathPart => encodeURIComponent(decodeURIComponent(pathPart)))
  .join("/");

  return {
    pathname: encodedPathname,
    search,
    hash,
    href,
    origin,
    protocol,
    host,
    hostname,
    port,
    state: source.history.state,
    key: (source.history.state && source.history.state.key) || "initial"
  };
};

export const createHistory = (source: HistorySource): History => {
  let listeners: Array<(params: { location: HistoryLocation; action: string }) => void> = [];
  let location = getLocation(source);
  let transitioning = false;
  let resolveTransition = () => {};

  return {
    get location() {
      return location;
    },

    get transitioning() {
      return transitioning;
    },

    _onTransitionComplete() {
      transitioning = false;
      resolveTransition();
    },

    listen(listener) {
      listeners.push(listener);

      let popstateListener = () => {
        location = getLocation(source);
        listener({ location, action: "POP" });
      };

      source.addEventListener("popstate", popstateListener);

      return () => {
        source.removeEventListener("popstate", popstateListener);
        listeners = listeners.filter(fn => fn !== listener);
      };
    },

    navigate(to, { state, replace = false } = {}) {
      if (typeof to === "number") {
        source.history.go(to);
      } else {
        state = { ...state, key: Date.now() + "" };
        // try...catch iOS Safari limits to 100 pushState calls
        try {
          if (transitioning || replace) {
            source.history.replaceState(state, null, to as string);
          } else {
            source.history.pushState(state, null, to as string);
          }
        } catch (e) {
          (replace ? window.location.replace : window.location.assign)(to as string);
        }
      }

      location = getLocation(source);
      transitioning = true;
      let transition = new Promise<void>(res => (resolveTransition = res));
      listeners.forEach(listener => listener({ location, action: "PUSH" }));
      return transition;
    }
  } as History;
};

////////////////////////////////////////////////////////////////////////////////
// Stores history entries in memory for testing or other platforms like Native
export const createMemorySource = (initialPath: string = "/"): HistorySource => {
  let searchIndex = initialPath.indexOf("?");
  let initialLocation = {
    pathname:
      searchIndex > -1 ? initialPath.substr(0, searchIndex) : initialPath,
    search: searchIndex > -1 ? initialPath.substr(searchIndex) : "",
    hash: "",
    href: "",
    origin: "",
    protocol: "",
    host: "",
    hostname: "",
    port: ""
  };
  let index = 0;
  let stack = [initialLocation];
  let states: any[] = [null];

  return {
    get location() {
      return stack[index];
    },
    addEventListener(name: string, fn: () => void) {},
    removeEventListener(name: string, fn: () => void) {},
    history: {
      get entries() {
        return stack;
      },
      get index() {
        return index;
      },
      get state() {
        return states[index];
      },
      pushState(state: any, _: any, uri: string) {
        let [pathname, search = ""] = uri.split("?");
        index++;
        stack.push({ 
          pathname, 
          search: search.length ? `?${search}` : search,
          hash: "",
          href: "",
          origin: "",
          protocol: "",
          host: "",
          hostname: "",
          port: ""
        });
        states.push(state);
      },
      replaceState(state: any, _: any, uri: string) {
        let [pathname, search = ""] = uri.split("?");
        stack[index] = { 
          pathname, 
          search,
          hash: "",
          href: "",
          origin: "",
          protocol: "",
          host: "",
          hostname: "",
          port: ""
        };
        states[index] = state;
      },
      go(to: number) {
        let newIndex = index + to;

        if (newIndex < 0 || newIndex > states.length - 1) {
          return;
        }

        index = newIndex;
      }
    }
  } as HistorySource;
};

////////////////////////////////////////////////////////////////////////////////
// global history - uses window.history as the source if available, otherwise a
// memory history
export const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

const getSource = (): HistorySource => {
  return canUseDOM ? {
    location: window.location,
    history: window.history,
    addEventListener: window.addEventListener.bind(window),
    removeEventListener: window.removeEventListener.bind(window)
  } as unknown as HistorySource : createMemorySource();
};

export const globalHistory = createHistory(getSource());
export const { navigate } = globalHistory;