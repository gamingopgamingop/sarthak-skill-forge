import invariant from "invariant";

// Type definitions
export interface Route {
  path: string;
  default?: boolean;
  value: any;
}

export interface MatchResult {
  route: Route;
  params: { [key: string]: string };
  uri: string;
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
  state: any;
  key: string;
}

////////////////////////////////////////////////////////////////////////////////
// startsWith(string, search) - Check if `string` starts with `search`
export const startsWith = (string: string, search: string): boolean => {
  return string.substr(0, search.length) === search;
};

////////////////////////////////////////////////////////////////////////////////
// pick(routes, uri)
//
// Ranks and picks the best route to match. Each segment gets the highest
// amount of points, then the type of segment gets an additional amount of
// points where
//
//     static > dynamic > splat > root
//
// This way we don't have to worry about the order of our routes, let the
// computers do it.
//
// A route looks like this
//
//     { path, default, value }
//
// And a returned match looks like:
//
//     { route, params, uri }
//
// I know, I should use TypeScript not comments for these types.
export const pick = (routes: Route[], uri: string): MatchResult | null => {
  let match: MatchResult | undefined;
  let default_: MatchResult | undefined;

  let [uriPathname] = uri.split("?");
  let uriSegments = segmentize(uriPathname);
  let isRootUri = uriSegments[0] === "";
  let ranked = rankRoutes(routes);

  for (let i = 0, l = ranked.length; i < l; i++) {
    let missed = false;
    let route = ranked[i].route;

    if (route.default) {
      default_ = {
        route,
        params: {},
        uri
      };
      continue;
    }

    let routeSegments = segmentize(route.path);
    let params: { [key: string]: string } = {};
    let max = Math.max(uriSegments.length, routeSegments.length);
    let index = 0;

    for (; index < max; index++) {
      let routeSegment = routeSegments[index];
      let uriSegment = uriSegments[index];

      if (isSplat(routeSegment)) {
        // Hit a splat, just grab the rest, and return a match
        // uri:   /files/documents/work
        // route: /files/*
        const param = routeSegment.slice(1) || "*";
        params[param] = uriSegments
          .slice(index)
          .map(decodeURIComponent)
          .join("/");
        break;
      }

      if (uriSegment === undefined) {
        // URI is shorter than the route, no match
        // uri:   /users
        // route: /users/:userId
        missed = true;
        break;
      }

      let dynamicMatch = paramRe.exec(routeSegment);

      if (dynamicMatch && !isRootUri) {
        let matchIsNotReserved = reservedNames.indexOf(dynamicMatch[1]) === -1;
        invariant(
          matchIsNotReserved,
          `<Router> dynamic segment "${dynamicMatch[1]}" is a reserved name. Please use a different name in path "${route.path}".`
        );
        let value = decodeURIComponent(uriSegment);
        params[dynamicMatch[1]] = value;
      } else if (routeSegment !== uriSegment) {
        // Current segments don't match, not dynamic, not splat, so no match
        // uri:   /users/123/settings
        // route: /users/:id/profile
        missed = true;
        break;
      }
    }

    if (!missed) {
      match = {
        route,
        params,
        uri: "/" + uriSegments.slice(0, index).join("/")
      };
      break;
    }
  }

  return match || default_ || null;
};


// match(path, uri) - Matches just one path to a uri, also lol
export const match = (path: string, uri: string): MatchResult | null => pick([{ path } as Route], uri);


// resolve(to, basepath)
//
// Resolves URIs as though every path is a directory, no files.  Relative URIs
// in the browser can feel awkward because not only can you be "in a directory"
// you can be "at a file", too. For example
//
//     browserSpecResolve('foo', '/bar/') => /bar/foo
//     browserSpecResolve('foo', '/bar') => /foo
//
// But on the command line of a file system, it's not as complicated, you can't
// `cd` from a file, only directories.  This way, links have to know less about
// their current path. To go deeper you can do this:
//
//     <Link to="deeper"/>
//     // instead of
//     <Link to=`{${props.uri}/deeper}`/>
//
// Just like `cd`, if you want to go deeper from the command line, you do this:
//
//     cd deeper
//     # not
//     cd $(pwd)/deeper
//
// By treating every path as a directory, linking to relative paths should
// require less contextual information and (fingers crossed) be more intuitive.
export const resolve = (to: string, base: string): string => {
  // /foo/bar, /baz/qux => /foo/bar
  if (startsWith(to, "/")) {
    return to;
  }

  let [toPathname, toQuery] = to.split("?");
  let [basePathname] = base.split("?");

  let toSegments = segmentize(toPathname);
  let baseSegments = segmentize(basePathname);

  // ?a=b, /users?b=c => /users?a=b
  if (toSegments[0] === "") {
    return addQuery(basePathname, toQuery);
  }

  // profile, /users/789 => /users/789/profile
  if (!startsWith(toSegments[0], ".")) {
    let pathname = baseSegments.concat(toSegments).join("/");
    return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
  }

  // ./         /users/123  =>  /users/123
  // ../        /users/123  =>  /users
  // ../..      /users/123  =>  /
  // ../../one  /a/b/c/d    =>  /a/b/one
  // .././one   /a/b/c/d    =>  /a/b/c/one
  let allSegments = baseSegments.concat(toSegments);
  let segments: string[] = [];
  for (let i = 0, l = allSegments.length; i < l; i++) {
    let segment = allSegments[i];
    if (segment === "..") segments.pop();
    else if (segment !== ".") segments.push(segment);
  }

  return addQuery("/" + segments.join("/",), toQuery);
};

// insertParams(path, params)

export const insertParams = (path: string, params: { [key: string]: any }): string => {
  let [pathBase, query = ""] = path.split("?");
  let segments = segmentize(pathBase);
  let constructedPath =
    "/" +
    segments
      .map(segment => {
        let match = paramRe.exec(segment);
        return match ? params[match[1]] : segment;
      })
      .join("/");
  const { location: { search = "" } = {} } = params;
  const searchSplit = search.split("?")[1] || "";
  constructedPath = addQuery(constructedPath, query, searchSplit);
  return constructedPath;
};

export const validateRedirect = (from: string, to: string): boolean => {
  let filter = (segment: string) => isDynamic(segment);
  let fromString = segmentize(from)
    .filter(filter)
    .sort()
    .join("/");
  let toString = segmentize(to)
    .filter(filter)
    .sort()
    .join("/");
  return fromString === toString;
};


// Junk
const paramRe = /^:(.+)/;

const SEGMENT_POINTS = 4;
const STATIC_POINTS = 3;
const DYNAMIC_POINTS = 2;
const SPLAT_PENALTY = 1;
const ROOT_POINTS = 1;

const isRootSegment = (segment: string): boolean => segment === "";
const isDynamic = (segment: string): boolean => paramRe.test(segment);
const isSplat = (segment: string): boolean => Boolean(segment && segment[0] === "*");

interface RankedRoute {
  route: Route;
  score: number;
  index: number;
}

const rankRoute = (route: Route, index: number): RankedRoute => {
  let score = (route.default === true)  // Explicitly check if default is true
    ? 0
    : segmentize(route.path).reduce((score, segment) => {
        score += SEGMENT_POINTS;
        if (isRootSegment(segment)) score += ROOT_POINTS;
        else if (isDynamic(segment)) score += DYNAMIC_POINTS;
        else if (isSplat(segment)) score -= SEGMENT_POINTS + SPLAT_PENALTY;
        else score += STATIC_POINTS;
        return score;
      }, 0);
  return { route, score, index };
};

const rankRoutes = (routes: Route[]): RankedRoute[] =>
  routes
    .map(rankRoute)
    .sort((a, b) =>
      a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
    );

const segmentize = (uri: string): string[] =>
  uri
    // strip starting/ending slashes
    .replace(/(^\/+|\/+$)/g, "")
    .split("/");

const addQuery = (pathname: string, ...query: (string | undefined)[]): string => {
  query = query.filter(q => q != null && q.length > 0);
  return pathname + (query.length > 0 ? `?${query.join("&")}` : "");
};

const reservedNames = ["uri", "path"];

/**
 * Shallow compares two objects.
 * @param {Object} obj1 The first object to compare.
 * @param {Object} obj2 The second object to compare.
 */
export const shallowCompare = (obj1: { [key: string]: any }, obj2: { [key: string]: any }): boolean => {
  const obj1Keys = Object.keys(obj1);
  return (
    obj1Keys.length === Object.keys(obj2).length &&
    obj1Keys.every(key => obj2.hasOwnProperty(key) && obj1[key] === obj2[key])
  );
};