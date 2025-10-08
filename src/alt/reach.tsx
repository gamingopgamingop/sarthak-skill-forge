import React from "react";
import { Router, Link ,Match , Redirect, Location, navigate, ServerLocation, isRedirect, RouteComponentProps, useLocation, useMatch, useNavigate, useParams, createMemorySource,
  createHistory, LocationProvider, redirectTo} from "@reach/router";

const Home = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2">Reach Router Demo</h2>
    <p className="text-muted-foreground">Focus on accessibility.</p>
  </div>
);

const About = () => <div>About (Reach)</div>;

export default function ReachHost() {
  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6 flex gap-3">
          <Link to="/alt/reach">Home</Link>
          <Link to="/alt/reach/about">About</Link>
        </nav>
        <Router>
          <Home path="/alt/reach" />
          <About path="/alt/reach/about" />
        </Router>
      </div>
    </div>
  );
}


