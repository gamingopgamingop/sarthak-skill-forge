// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from "react";

type LoadState = "idle" | "loading" | "ready" | "error";

function Section({ title, docsHref, children }: { title: string; docsHref?: string; children: React.ReactNode }) {
  return (
    <section className="mb-10 p-6 rounded-lg border bg-background/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {docsHref ? (
          <a className="text-primary underline" href={docsHref} target="_blank" rel="noreferrer">Docs</a>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Availability({ installed, pkg, note }: { installed: boolean; pkg: string; note?: string }) {
  return (
    <div className="text-sm text-muted-foreground mb-3">
      <span className={installed ? "text-emerald-600" : "text-amber-600"}>
        {installed ? "Available" : "Not installed"}
      </span>
      {!installed && (
        <span>
          {" "}- install <code className="px-1 rounded bg-muted">{pkg}</code>{note ? ` (${note})` : ""}
        </span>
      )}
    </div>
  );
}

export default function AnimationsShowcase() {
  const [hasGSAP, setHasGSAP] = useState(false);
  const [hasSpring, setHasSpring] = useState(false);
  const [hasMotion, setHasMotion] = useState(false);
  const [hasPopmotion, setHasPopmotion] = useState(false);
  const [hasRTG, setHasRTG] = useState(false);
  const [hasLottie, setHasLottie] = useState(false);
  const [hasFlip, setHasFlip] = useState(false);

  useEffect(() => {
    import("gsap").then(() => setHasGSAP(true)).catch(() => {});
    import("@react-spring/web").then(() => setHasSpring(true)).catch(() => {});
    import("react-motion").then(() => setHasMotion(true)).catch(() => {});
    import("popmotion").then(() => setHasPopmotion(true)).catch(() => {});
    import("react-transition-group").then(() => setHasRTG(true)).catch(() => {});
    import("lottie-react").then(() => setHasLottie(true)).catch(() => {});
    import("react-flip-toolkit").then(() => setHasFlip(true)).catch(() => {});
  }, []);

  // Anime.js demo (already in deps)
  const animeRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let cleanup: any;
    (async () => {
      try {
        const animeMod = await import("animejs");
        const anime = animeMod.default || animeMod;
        const el = animeRef.current;
        if (!el) return;
        const tl = anime.timeline({ loop: true });
        tl.add({ targets: el, translateX: [0, 120], opacity: [0.4, 1], duration: 1200, easing: "easeInOutSine" })
          .add({ targets: el, translateX: [120, 0], scale: [1, 1.08], duration: 900, easing: "easeInOutSine" })
        cleanup = () => tl.pause();
      } catch {}
    })();
    return () => { if (cleanup) cleanup(); };
  }, []);

  // GSAP demo (optional)
  const gsapBoxRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const mod = await import("gsap");
        const gsap = mod.gsap || mod.default || mod;
        if (gsapBoxRef.current) {
          gsap.to(gsapBoxRef.current, { x: 100, rotation: 15, repeat: -1, yoyo: true, duration: 1.2, ease: "power1.inOut" });
        }
      } catch {}
    })();
  }, []);

  // Popmotion demo (optional)
  const popRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const { animate } = await import("popmotion");
        if (popRef.current) {
          animate({ from: 0, to: 1, duration: 1500, repeat: Infinity, repeatType: "reverse", onUpdate: (v: number) => {
            popRef.current!.style.opacity = String(0.4 + v * 0.6);
          }});
        }
      } catch {}
    })();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Animations Showcase</h1>

      <Section title="Anime.js" docsHref="https://animejs.com/">
        <Availability installed={true} pkg="animejs" />
        <div ref={animeRef} className="w-24 h-10 rounded bg-primary text-primary-foreground flex items-center justify-center">Anime</div>
      </Section>

      <Section title="GSAP (GreenSock)" docsHref="https://greensock.com/gsap/">
        <Availability installed={hasGSAP} pkg="gsap" />
        <div ref={gsapBoxRef} className="w-24 h-10 rounded bg-secondary text-secondary-foreground flex items-center justify-center">GSAP</div>
      </Section>

      <Section title="React Spring" docsHref="https://www.react-spring.dev/">
        <Availability installed={hasSpring} pkg="@react-spring/web" />
        {hasSpring ? (
          <React.Suspense fallback={<div>Loading…</div>}>
            <SpringDemo />
          </React.Suspense>
        ) : (
          <div className="text-sm text-muted-foreground">Install <code className="px-1 rounded bg-muted">@react-spring/web</code> to enable this demo.</div>
        )}
      </Section>

      <Section title="React Motion" docsHref="https://github.com/chenglou/react-motion">
        <Availability installed={hasMotion} pkg="react-motion" />
        {hasMotion ? (
          <React.Suspense fallback={<div>Loading…</div>}>
            <MotionDemo />
          </React.Suspense>
        ) : (
          <div className="text-sm text-muted-foreground">Install <code className="px-1 rounded bg-muted">react-motion</code> to enable this demo.</div>
        )}
      </Section>

      <Section title="Popmotion" docsHref="https://popmotion.io/">
        <Availability installed={hasPopmotion} pkg="popmotion" />
        <div ref={popRef} className="w-24 h-10 rounded bg-accent text-accent-foreground flex items-center justify-center">Pop</div>
      </Section>

      <Section title="React Transition Group" docsHref="https://reactcommunity.org/react-transition-group/">
        <Availability installed={hasRTG} pkg="react-transition-group" />
        {hasRTG ? (
          <RTGDemo />
        ) : (
          <div className="text-sm text-muted-foreground">Install <code className="px-1 rounded bg-muted">react-transition-group</code> to enable this demo.</div>
        )}
      </Section>

      <Section title="Lottie" docsHref="https://airbnb.io/lottie/#/web">
        <Availability installed={hasLottie} pkg="lottie-react" note="requires a .json animation" />
        {hasLottie ? (
          <LottieDemo />
        ) : (
          <div className="text-sm text-muted-foreground">Install <code className="px-1 rounded bg-muted">lottie-react</code> and provide an animation JSON.</div>
        )}
      </Section>

      <Section title="React Flip Toolkit" docsHref="https://github.com/aholachek/react-flip-toolkit">
        <Availability installed={hasFlip} pkg="react-flip-toolkit" />
        {hasFlip ? (
          <FlipDemo />
        ) : (
          <div className="text-sm text-muted-foreground">Install <code className="px-1 rounded bg-muted">react-flip-toolkit</code> to enable this demo.</div>
        )}
      </Section>
    </div>
  );
}

// Lazy sub-demos that import on demand to avoid hard deps
const SpringDemo = React.lazy(async () => {
  const spring = await import("@react-spring/web");
  const Comp: React.FC = () => {
    const styles = spring.useSpring({ from: { opacity: 0.2 }, to: { opacity: 1 }, loop: { reverse: true }, config: { tension: 120, friction: 14 } });
    return <spring.animated.div style={styles} className="w-24 h-10 rounded bg-primary/20 flex items-center justify-center">Spring</spring.animated.div>;
  };
  return { default: Comp };
});

const MotionDemo = React.lazy(async () => {
  const motion = await import("react-motion");
  const { Motion, spring } = motion as any;
  const Comp: React.FC = () => (
    <Motion defaultStyle={{ x: 0 }} style={{ x: spring(100) }}>
      {(val: any) => (
        <div style={{ transform: `translateX(${val.x}px)` }} className="w-24 h-10 rounded bg-secondary/30 flex items-center justify-center">Motion</div>
      )}
    </Motion>
  );
  return { default: Comp };
});

const RTGDemo: React.FC = () => {
  const [show, setShow] = useState(false);
  const [CSSTransition, setCSSTransition] = useState<any>(null);
  useEffect(() => {
    import("react-transition-group").then(mod => setCSSTransition(() => mod.CSSTransition)).catch(() => {});
  }, []);
  return (
    <div>
      <button className="px-3 py-1 rounded bg-primary text-primary-foreground mb-3" onClick={() => setShow(s => !s)}>
        Toggle
      </button>
      {CSSTransition ? (
        <CSSTransition in={show} timeout={200} classNames="fade" unmountOnExit>
          <div className="w-24 h-10 rounded bg-muted flex items-center justify-center">RTG</div>
        </CSSTransition>
      ) : (
        <div className="text-sm text-muted-foreground">Loading…</div>
      )}
      <style>{`.fade-enter{opacity:0}.fade-enter-active{opacity:1;transition:opacity .2s}.fade-exit{opacity:1}.fade-exit-active{opacity:0;transition:opacity .2s}`}</style>
    </div>
  );
};

const LottieDemo: React.FC = () => {
  const [Lottie, setLottie] = useState<any>(null);
  useEffect(() => {
    import("lottie-react").then(mod => setLottie(() => mod.default)).catch(() => {});
  }, []);
  // Minimal inline animation JSON (tiny dot pulsing)
  const animationData = useMemo(() => ({ v: "5.7.4", fr: 30, ip: 0, op: 60, w: 50, h: 50, nm: "dot", layers: [ { ddd: 0, ind: 1, ty: 4, nm: "c", ks: { o: { a: 0, k: 100 }, r: { a: 0, k: 0 }, p: { a: 0, k: [25,25,0] }, a: { a: 0, k: [0,0,0] }, s: { a: 0, k: [100,100,100] } }, shapes: [ { ty: "el", p: { a: 0, k: [0,0] }, s: { a: 0, k: [20,20] }, d: 1 }, { ty: "fl", c: { a: 0, k: [0.2,0.6,1,1] }, o: { a: 0, k: 100 } } ], ao: 0, ip: 0, op: 60, st: 0, bm: 0 } ] }), []);
  return Lottie ? (
    <div className="w-24">
      <Lottie animationData={animationData} loop={true} />
    </div>
  ) : (
    <div className="text-sm text-muted-foreground">Loading…</div>
  );
};

const FlipDemo: React.FC = () => {
  const [Flipper, setFlipper] = useState<any>(null);
  const [Flipped, setFlipped] = useState<any>(null);
  const [items, setItems] = useState([1, 2, 3, 4]);
  useEffect(() => {
    import("react-flip-toolkit").then(mod => { setFlipper(() => mod.Flipper); setFlipped(() => mod.Flipped); }).catch(() => {});
  }, []);
  if (!Flipper || !Flipped) return <div className="text-sm text-muted-foreground">Loading…</div>;
  return (
    <Flipper flipKey={items.join(",")}>
      <div className="flex gap-2 mb-3">
        <button className="px-3 py-1 rounded bg-primary text-primary-foreground" onClick={() => setItems([...items].reverse())}>Reverse</button>
      </div>
      <div className="flex gap-2">
        {items.map((n) => (
          <Flipped key={n} flipId={String(n)}>
            <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">{n}</div>
          </Flipped>
        ))}
      </div>
    </Flipper>
  );
};


