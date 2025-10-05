import React, { useEffect, useMemo, useState } from "react";
import UniversalRouter, { Route } from "universal-router";

const routes: Route[] = [
  { path: "/alt/universal", action: () => <div>Universal Router Home</div> },
  { path: "/alt/universal/about", action: () => <div>About (Universal)</div> },
];

export default function UniversalHost() {
  const router = useMemo(() => new UniversalRouter(routes), []);
  const [Component, setComponent] = useState<React.ReactNode>(null);

  useEffect(() => {
    const handle = async () => {
      setComponent(await router.resolve(window.location.pathname).catch(() => <div>Not Found</div>));
    };
    handle();
    const onPop = () => handle();
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [router]);

  const navigate = (to: string) => {
    window.history.pushState(null, "", to);
    router.resolve(to).then(setComponent).catch(() => setComponent(<div>Not Found</div>));
  };

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6 flex gap-3">
          <button onClick={() => navigate('/alt/universal')}>Home</button>
          <button onClick={() => navigate('/alt/universal/about')}>About</button>
        </nav>
        <div>{Component}</div>
      </div>
    </div>
  );
}


