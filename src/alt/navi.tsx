import React from "react";
import { Router, route, mount, View } from "navi";

const routes = mount({
  "/alt/navi": route({ view: <div>Navi Home</div> }),
  "/alt/navi/about": route({ view: <div>About (Navi)</div> }),
});

export default function NaviHost() {
  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6 flex gap-3">
          <a href="/alt/navi">Home</a>
          <a href="/alt/navi/about">About</a>
        </nav>
        <Router routes={routes}>
          <View />
        </Router>
      </div>
    </div>
  );
}


