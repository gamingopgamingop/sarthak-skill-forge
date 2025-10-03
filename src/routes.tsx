import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import TechPage from "./pages/TechPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ServicesPage from "./pages/ServicesPage";
import GalleryPage from "./pages/GalleryPage";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/about",
                element: <AboutPage />,
            },
            {
                path: "/skills",
                element: <SkillsPage />,
            },
            {
                path: "/projects",
                element: <ProjectsPage />,
            },
            {
                path: "/tech",
                element: <TechPage />,
            },
            {
                path: "/blog",
                element: <BlogPage />,
            },
            {
                path: "/contact",
                element: <ContactPage />,
            },
            {
                path: "/testimonials",
                element: <TestimonialsPage />,
            },
            {
                path: "/services",
                element: <ServicesPage />,
            },
            {
                path: "/gallery",
                element: <GalleryPage />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

export default routes;