import React from "react";
import { useRoutes, A } from "hookrouter";

const routes = {
  "/alt/hookrouter": () => <div>hookrouter Home</div>,
  "/alt/hookrouter/about": () => <div>About (hookrouter)</div>,
};

export default function HookrouterHost() {
  const routeResult = useRoutes(routes);
  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6 flex gap-3">
          <A href="/alt/hookrouter">Home</A>
          <A href="/alt/hookrouter/about">About</A>
        </nav>
        <div>{routeResult || <div>Not Found</div>}</div>
      </div>
    </div>
  );
}


