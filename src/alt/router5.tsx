import React, { useEffect, useState } from "react";
import createRouter from "router5";
import browserPlugin from "router5-plugin-browser";

export default function Router5Host() {
  const [route, setRoute] = useState<any>(null);

  useEffect(() => {
    const router = createRouter(
      [
        { name: 'home', path: '/alt/router5' },
        { name: 'about', path: '/alt/router5/about' },
      ],
      { defaultRoute: 'home' }
    ).usePlugin(browserPlugin());
    router.start();
    const unsub = router.subscribe(({ route }) => setRoute(route));
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6 flex gap-3">
          <a href="/alt/router5">Home</a>
          <a href="/alt/router5/about">About</a>
        </nav>
        <div>
          {route?.name === 'home' && <div>Router5 Home</div>}
          {route?.name === 'about' && <div>About (Router5)</div>}
        </div>
      </div>
    </div>
  );
}


