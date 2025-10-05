import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "./App";
// TanStack Router host, mounted under /tsr/*
const TsrHost = lazy(() => import("./tsr/router"));
// Alternative routers demos
const WouterHost = lazy(() => import("./alt/wouter"));
const ReachHost = lazy(() => import("./alt/reach"));
const UniversalHost = lazy(() => import("./alt/universal"));
const Router5Host = lazy(() => import("./alt/router5"));
const PageJsHost = lazy(() => import("./alt/page"));
const NavigoHost = lazy(() => import("./alt/navigo"));
const HookrouterHost = lazy(() => import("./alt/hookrouter"));
const NaviHost = lazy(() => import("./alt/navi"));

// Lazy load all page components
const Home = lazy(() => import("./pages/Home"));
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/AboutPage"));
const Skills = lazy(() => import("./pages/SkillsPage"));
const Projects = lazy(() => import("./pages/ProjectsPage"));
const Tech = lazy(() => import("./pages/TechPage"));
const Blog = lazy(() => import("./pages/BlogPage"));
const Contact = lazy(() => import("./pages/ContactPage"));
const Testimonials = lazy(() => import("./pages/TestimonialsPage"));
const Services = lazy(() => import("./pages/ServicesPage"));
const Gallery = lazy(() => import("./pages/GalleryPage"));
const AnimationsShowcase = lazy(() => import("./pages/AnimationsShowcase"));
const ComingSoon = lazy(() => import("./pages/info/ComingSoon"));
const ServerError = lazy(() => import("./pages/errors/ServerError"));
const ThankYou = lazy(() => import("./pages/info/ThankYou"));
const NotFound = lazy(() => import("./pages/errors/NotFound"));


// Page loader component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="text-center space-y-4">
      <div className="relative mx-auto w-16 h-16">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
        <div className="animate-ping absolute inset-0 rounded-full h-16 w-16 border-4 border-primary/30"></div>
      </div>
      <p className="text-muted-foreground text-sm animate-pulse">Loading...</p>
    </div>
  </div>
);

// Suspense wrapper for each route
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>
    {children}
  </Suspense>
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <SuspenseWrapper>
            <Home />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/alt/wouter/*",
        element: (
          <SuspenseWrapper>
            <WouterHost />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/alt/reach/*",
        element: (
          <SuspenseWrapper>
            <ReachHost />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/alt/universal/*",
        element: (
          <SuspenseWrapper>
            <UniversalHost />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/alt/router5/*",
        element: (
          <SuspenseWrapper>
            <Router5Host />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/alt/page/*",
        element: (
          <SuspenseWrapper>
            <PageJsHost />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/alt/navigo/*",
        element: (
          <SuspenseWrapper>
            <NavigoHost />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/alt/hookrouter/*",
        element: (
          <SuspenseWrapper>
            <HookrouterHost />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/alt/navi/*",
        element: (
          <SuspenseWrapper>
            <NaviHost />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/about",
        element: (
          <SuspenseWrapper>
            <About />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/skills",
        element: (
          <SuspenseWrapper>
            <Skills />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/projects",
        element: (
          <SuspenseWrapper>
            <Projects />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/tech",
        element: (
          <SuspenseWrapper>
            <Tech />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/blog",
        element: (
          <SuspenseWrapper>
            <Blog />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/contact",
        element: (
          <SuspenseWrapper>
            <Contact />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/testimonials",
        element: (
          <SuspenseWrapper>
            <Testimonials />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/services",
        element: (
          <SuspenseWrapper>
            <Services />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/gallery",
        element: (
          <SuspenseWrapper>
            <Gallery />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/animations",
        element: (
          <SuspenseWrapper>
            <AnimationsShowcase />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/tsr/*",
        element: (
          <SuspenseWrapper>
            <TsrHost />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/coming-soon",
        element: (
          <SuspenseWrapper>
            <ComingSoon />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/thank-you",
        element: (
          <SuspenseWrapper>
            <ThankYou />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/server-error",
        element: (
          <SuspenseWrapper>
            <ServerError />
          </SuspenseWrapper>
        ),
      },
      {
        path: "*",
        element: (
          <SuspenseWrapper>
            <NotFound />
          </SuspenseWrapper>
        ),
      },
    ],
  },
]);

export default routes;
