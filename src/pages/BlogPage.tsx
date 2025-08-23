import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Clock, Tag, ArrowRight } from "lucide-react";

const BlogPage = () => {
  const blogPosts = [
    {
      title: "Advanced Python OOP Concepts",
      excerpt: "Deep dive into object-oriented programming with Python, covering inheritance, polymorphism, and design patterns.",
      date: "2024-01-15",
      readTime: "12 min read",
      tags: ["Python", "OOP", "Programming"],
      featured: true
    },
    {
      title: "Building AI Chatbots with FastAPI",
      excerpt: "Complete guide to creating intelligent chatbots using FastAPI, integrating with modern AI APIs.",
      date: "2024-01-10",
      readTime: "15 min read",
      tags: ["AI", "FastAPI", "Chatbots"]
    },
    {
      title: "Database Design Best Practices",
      excerpt: "Essential principles for designing scalable and efficient databases with PostgreSQL.",
      date: "2024-01-05",
      readTime: "10 min read",
      tags: ["Database", "PostgreSQL", "Design"]
    },
    {
      title: "Web Automation with Python",
      excerpt: "Learn how to automate web tasks using Python, Selenium, and modern scraping techniques.",
      date: "2024-01-01",
      readTime: "18 min read",
      tags: ["Python", "Automation", "Web Scraping"]
    },
    {
      title: "React Performance Optimization",
      excerpt: "Techniques to improve React app performance, including memoization, lazy loading, and bundle optimization.",
      date: "2023-12-28",
      readTime: "14 min read",
      tags: ["React", "Performance", "JavaScript"]
    },
    {
      title: "Machine Learning for Beginners",
      excerpt: "Introduction to machine learning concepts with practical Python examples and real-world applications.",
      date: "2023-12-25",
      readTime: "20 min read",
      tags: ["Machine Learning", "Python", "AI"]
    }
  ];

  const categories = [
    { name: "Python", count: 25, color: "from-blue-500 to-cyan-500" },
    { name: "Web Development", count: 18, color: "from-green-500 to-emerald-500" },
    { name: "AI & ML", count: 12, color: "from-purple-500 to-pink-500" },
    { name: "Database", count: 8, color: "from-orange-500 to-red-500" },
    { name: "Automation", count: 6, color: "from-yellow-500 to-orange-500" }
  ];

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Urban Jiva Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Exploring 50+ programming languages, tech trends, and digital innovation through in-depth articles and tutorials
          </p>
        </motion.div>

        {/* Blog Stats & Categories */}
        <motion.div 
          className="grid md:grid-cols-5 gap-6 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card-hover p-4 text-center relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="text-2xl font-bold text-foreground mb-1">{category.count}</div>
                  <div className="text-sm text-muted-foreground">{category.name}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map((post, index) => (
          <motion.div 
            key={post.title}
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="card-hover p-8 bg-gradient-to-br from-primary/5 to-accent/5 border border-accent/20">
              <Badge variant="secondary" className="mb-4 bg-primary text-primary-foreground">
                Featured Post
              </Badge>
              
              <h2 className="text-3xl font-bold mb-4 text-foreground">{post.title}</h2>
              <p className="text-muted-foreground mb-6 text-lg">{post.excerpt}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readTime}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-muted/10 text-foreground border border-accent/20">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <Button variant="tech" size="lg">
                Read Full Article
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Card>
          </motion.div>
        ))}

        {/* Blog Posts Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {blogPosts.filter(post => !post.featured).map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="card-hover p-6 h-full">
                <h3 className="text-xl font-bold mb-3 text-foreground">{post.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-muted/10 text-foreground border border-accent/20 text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 2 && (
                    <Badge variant="secondary" className="bg-muted/10 text-foreground border border-accent/20 text-xs">
                      +{post.tags.length - 2}
                    </Badge>
                  )}
                </div>
                
                <Button variant="outline" size="sm" className="w-full group">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border border-accent/20">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Visit Urban Jiva Blog
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Explore the complete collection of articles covering programming languages, 
              frameworks, and cutting-edge technology trends.
            </p>
            <Button variant="tech" size="lg">
              <ExternalLink className="mr-2 h-5 w-5" />
              Visit Blog
            </Button>
          </Card>
        </motion.div>
      </div>
    </main>
  );
};

export default BlogPage;