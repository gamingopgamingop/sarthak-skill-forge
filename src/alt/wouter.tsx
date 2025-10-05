import React from "react";
import { Link, Route, Switch, useLocation } from "wouter";

const Home = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2">Wouter Demo</h2>
    <p className="text-muted-foreground">A minimal, fast hooks-based router.</p>
  </div>
);

const About = () => <div>About (Wouter)</div>;

export default function WouterHost() {
  const [location] = useLocation();
  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6 flex gap-3">
          <Link href="/alt/wouter">Home</Link>
          <Link href="/alt/wouter/about">About</Link>
          <span className="text-xs text-muted-foreground ml-auto">{location}</span>
        </nav>
        <Switch>
          <Route path="/alt/wouter" component={Home} />
          <Route path="/alt/wouter/about" component={About} />
          <Route>Not Found</Route>
        </Switch>
      </div>
    </div>
  );
}


