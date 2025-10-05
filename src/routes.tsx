import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "./App";

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
