import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
}

const SEO = ({
  title = "Sarthak Bansal - Python Expert | AI Developer | Tech Entrepreneur",
  description = "Portfolio of Sarthak Bansal — showcasing Python, AI, and full-stack projects with innovation, automation, and creativity.",
  keywords = "Python developer, AI automation, React, Django, FastAPI, fullstack developer, portfolio, BCA student, software engineer, tech entrepreneur",
  ogImage = "/images.png",
  ogType = "website",
  canonicalUrl,
  article,
}: SEOProps) => {
  const siteUrl = "https://sarthakdevs.me";
  const fullUrl = canonicalUrl || siteUrl;
  const imageUrl = `${siteUrl}${ogImage}`;

  // Core schemas
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sarthak Bansal",
    url: siteUrl,
    image: imageUrl,
    jobTitle: "Python Developer & AI Specialist",
    worksFor: { "@type": "Organization", name: "Freelance" },
    alumniOf: "Bachelor of Computer Applications",
    description,
    sameAs: [
      "https://github.com/gamingopgamingop",
      "https://linkedin.com/in/sarthak-bansal-01550432b/",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sarthak Bansal Portfolio",
    url: siteUrl,
    description,
    author: { "@type": "Person", name: "Sarthak Bansal" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: fullUrl,
      },
    ],
  };

  const articleSchema = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        author: {
          "@type": "Person",
          name: article.author || "Sarthak Bansal",
        },
        datePublished: article.publishedTime,
        dateModified: article.modifiedTime,
        keywords: article.tags?.join(", "),
        mainEntityOfPage: { "@type": "WebPage", "@id": fullUrl },
      }
    : null;

  return (
    <Helmet>
      {/* HTML Attributes */}
      <html lang="en" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Title & Description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Sarthak Bansal" />
      <link rel="canonical" href={fullUrl} />

      {/* Favicon + Theme */}
      <link rel="icon" href="/favicon.ico" />
      <meta name="theme-color" content="#0ea5e9" />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Sarthak Bansal Portfolio" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_GB" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content="@sarthakdevs" />
      <meta name="twitter:site" content="@sarthakdevs" />

      {/* Robots + Indexing */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />

      {/* Performance Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {articleSchema && (
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
