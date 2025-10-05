import React, { useEffect, useState } from "react";
import page from "page";

export default function PageJsHost() {
  const [view, setView] = useState<React.ReactNode>(null);

  useEffect(() => {
    page('/alt/page', () => setView(<div>Page.js Home</div>));
    page('/alt/page/about', () => setView(<div>About (Page.js)</div>));
    page.start();
    return () => page.stop();
  }, []);

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6 flex gap-3">
          <a href="/alt/page">Home</a>
          <a href="/alt/page/about">About</a>
        </nav>
        <div>{view}</div>
      </div>
    </div>
  );
}


