import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
}

const SEO = ({
  title = "Sarthak Bansal - Python Expert | AI Developer | Tech Entrepreneur",
  description = "Second-Year BCA Student specializing in Python, AI automation, and full-stack development. Building innovative tech solutions and sharing knowledge through eBooks and tutorials.",
  keywords = "Python developer, AI automation, machine learning, web development, React, Django, FastAPI, tech entrepreneur, programming eBooks, BCA student, software engineer, automation expert, chatbot development",
  ogImage = "/images.png",
  ogType = "website",
  canonicalUrl,
  noindex = false,
  article,
}: SEOProps) => {
  const siteUrl = "https://sarthakdevs.me";
  const fullUrl = canonicalUrl || siteUrl;

  // Structured Data - Person Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sarthak Bansal",
    url: siteUrl,
    image: `${siteUrl}/images.png`,
    jobTitle: "Python Developer & AI Specialist",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    alumniOf: "BCA Student",
    description: "Python Expert, AI Developer, and Tech Entrepreneur specializing in automation and full-stack development",
    sameAs: [
      "https://github.com/gamingopgamingop",
      "https://www.linkedin.com/in/sarthak-bansal-01550432b/",
    ],
    knowsAbout: [
      "Python Programming",
      "Artificial Intelligence",
      "Machine Learning",
      "Web Development",
      "Automation",
      "Django",
      "React",
      "Database Design",
    ],
  };

  // Structured Data - Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sarthak Bansal Portfolio",
    url: siteUrl,
    description: "Portfolio showcasing Python development, AI projects, and tech innovations",
    author: {
      "@type": "Person",
      name: "Sarthak Bansal",
    },
  };

  // Article Schema (if article props provided)
  const articleSchema = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: description,
        author: {
          "@type": "Person",
          name: article.author || "Sarthak Bansal",
        },
        datePublished: article.publishedTime,
        dateModified: article.modifiedTime,
        keywords: article.tags?.join(", "),
      }
    : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Sarthak Bansal" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="Sarthak Bansal Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      <meta name="twitter:creator" content="@sarthakdevs" />

      {/* Article specific tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:author" content={article.author || "Sarthak Bansal"} />
          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Additional SEO tags */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      {articleSchema && (
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
