import { useState, useEffect } from 'react';

interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  modified: string;
  slug: string;
  link: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

interface WordPressBlogData {
  posts: WordPressPost[];
  loading: boolean;
  error: string | null;
  featuredPost: WordPressPost | null;
  categories: Array<{
    id: number;
    name: string;
    count: number;
  }>;
}

export const useWordPressBlog = (siteUrl?: string): WordPressBlogData => {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Array<{
    id: number;
    name: string;
    count: number;
  }>>([]);

  // Default to a demo URL if no WordPress site provided
  const wpApiUrl = siteUrl ? `${siteUrl}/wp-json/wp/v2` : null;

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!wpApiUrl) {
        // Use mock data if no WordPress URL provided
        setMockData();
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch posts with embedded media and terms
        const postsResponse = await fetch(
          `${wpApiUrl}/posts?_embed&per_page=20&orderby=date&order=desc`
        );
        
        if (!postsResponse.ok) {
          throw new Error(`Failed to fetch posts: ${postsResponse.status}`);
        }

        const postsData: WordPressPost[] = await postsResponse.json();

        // Fetch categories
        const categoriesResponse = await fetch(`${wpApiUrl}/categories`);
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData.slice(0, 5)); // Top 5 categories
        }

        setPosts(postsData);
      } catch (err) {
        console.error('Error fetching WordPress data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch blog data');
        // Fallback to mock data on error
        setMockData();
      } finally {
        setLoading(false);
      }
    };

    const setMockData = () => {
      // Mock data for demonstration
      const mockPosts: WordPressPost[] = [
        {
          id: 1,
          title: { rendered: "Advanced Python OOP Concepts for Web Development" },
          excerpt: { rendered: "Deep dive into object-oriented programming with Python, covering inheritance, polymorphism, and design patterns essential for modern web development." },
          content: { rendered: "" },
          date: "2024-01-15T10:00:00",
          modified: "2024-01-15T10:00:00",
          slug: "advanced-python-oop-concepts",
          link: "https://sarthakdevs.me/blog/advanced-python-oop-concepts",
          featured_media: 0,
          categories: [1, 2],
          tags: [1, 2, 3]
        },
        {
          id: 2,
          title: { rendered: "Building Scalable APIs with FastAPI and PostgreSQL" },
          excerpt: { rendered: "Complete guide to creating high-performance, scalable REST APIs using FastAPI, with advanced database optimization techniques." },
          content: { rendered: "" },
          date: "2024-01-10T09:00:00",
          modified: "2024-01-10T09:00:00",
          slug: "scalable-apis-fastapi-postgresql",
          link: "https://sarthakdevs.me/blog/scalable-apis-fastapi-postgresql",
          featured_media: 0,
          categories: [1, 3],
          tags: [2, 4, 5]
        },
        {
          id: 3,
          title: { rendered: "React Performance Optimization: Advanced Techniques" },
          excerpt: { rendered: "Master React performance optimization with advanced techniques including memoization, lazy loading, and bundle splitting for lightning-fast web apps." },
          content: { rendered: "" },
          date: "2024-01-05T14:00:00",
          modified: "2024-01-05T14:00:00",
          slug: "react-performance-optimization",
          link: "https://sarthakdevs.me/blog/react-performance-optimization",
          featured_media: 0,
          categories: [2, 4],
          tags: [1, 6, 7]
        },
        {
          id: 4,
          title: { rendered: "AI-Powered Web Automation with Python" },
          excerpt: { rendered: "Harness the power of AI and machine learning to create intelligent web automation solutions using Python, OpenAI, and modern scraping techniques." },
          content: { rendered: "" },
          date: "2024-01-01T11:00:00",
          modified: "2024-01-01T11:00:00",
          slug: "ai-powered-web-automation",
          link: "https://sarthakdevs.me/blog/ai-powered-web-automation",
          featured_media: 0,
          categories: [1, 5],
          tags: [2, 8, 9]
        },
        {
          id: 5,
          title: { rendered: "Modern DevOps: Docker, Kubernetes, and CI/CD Best Practices" },
          excerpt: { rendered: "Complete guide to modern DevOps practices, including containerization with Docker, orchestration with Kubernetes, and automated CI/CD pipelines." },
          content: { rendered: "" },
          date: "2023-12-28T16:00:00",
          modified: "2023-12-28T16:00:00",
          slug: "modern-devops-best-practices",
          link: "https://sarthakdevs.me/blog/modern-devops-best-practices",
          featured_media: 0,
          categories: [3, 6],
          tags: [10, 11, 12]
        },
        {
          id: 6,
          title: { rendered: "Machine Learning for Web Developers: A Practical Guide" },
          excerpt: { rendered: "Bridge the gap between web development and machine learning with practical examples, TensorFlow.js integration, and real-world AI applications." },
          content: { rendered: "" },
          date: "2023-12-25T13:00:00",
          modified: "2023-12-25T13:00:00",
          slug: "machine-learning-web-developers",
          link: "https://sarthakdevs.me/blog/machine-learning-web-developers",
          featured_media: 0,
          categories: [2, 5],
          tags: [13, 14, 15]
        }
      ];

      const mockCategories = [
        { id: 1, name: "Python Development", count: 25 },
        { id: 2, name: "Frontend Technologies", count: 18 },
        { id: 3, name: "Backend & APIs", count: 15 },
        { id: 4, name: "Performance & Optimization", count: 12 },
        { id: 5, name: "AI & Machine Learning", count: 10 }
      ];

      setPosts(mockPosts);
      setCategories(mockCategories);
      setLoading(false);
    };

    fetchBlogData();
  }, [wpApiUrl]);

  const featuredPost = posts.length > 0 ? posts[0] : null;

  return {
    posts,
    loading,
    error,
    featuredPost,
    categories
  };
};