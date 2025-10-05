import React, { useEffect, useState } from "react";
import Navigo from "navigo";

export default function NavigoHost() {
  const [view, setView] = useState<React.ReactNode>(null);

  useEffect(() => {
    const router = new Navigo('/');
    router
      .on('/alt/navigo', () => setView(<div>Navigo Home</div>))
      .on('/alt/navigo/about', () => setView(<div>About (Navigo)</div>))
      .notFound(() => setView(<div>Not Found</div>))
      .resolve();
    return () => router.destroy();
  }, []);

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6 flex gap-3">
          <a href="/alt/navigo">Home</a>
          <a href="/alt/navigo/about">About</a>
        </nav>
        <div>{view}</div>
      </div>
    </div>
  );
}


