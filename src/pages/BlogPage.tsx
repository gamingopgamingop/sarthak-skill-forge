import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useWordPressBlog } from "@/hooks/useWordPressBlog";
import { 
  ExternalLink, 
  Calendar, 
  Clock, 
  Tag, 
  ArrowRight, 
  BookOpen,
  TrendingUp,
  Users,
  Eye
} from "lucide-react";

const BlogPage = () => {
  // You can replace this with your actual WordPress site URL
  const { posts, loading, error, featuredPost, categories } = useWordPressBlog();

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  const stripHtml = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const blogStats = [
    { icon: <BookOpen />, title: "100+", subtitle: "Articles Published", color: "from-blue-500 to-cyan-500" },
    { icon: <Users />, title: "50K+", subtitle: "Monthly Readers", color: "from-green-500 to-emerald-500" },
    { icon: <Eye />, title: "500K+", subtitle: "Total Views", color: "from-purple-500 to-pink-500" },
    { icon: <TrendingUp />, title: "95%", subtitle: "Reader Satisfaction", color: "from-orange-500 to-red-500" }
  ];

  if (loading) {
    return (
      <main className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <Skeleton className="h-16 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-128 mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        </div>
      </main>
    );
  }

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
            <span className="gradient-text">Sarthak Devs Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Exploring programming languages, frameworks, AI innovations, and digital transformation through comprehensive tutorials and industry insights
          </p>
        </motion.div>

        {/* Blog Stats */}
        <motion.div 
          className="grid md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {blogStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card-hover p-6 text-center relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className={`text-primary mb-3 flex justify-center bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    {React.cloneElement(stat.icon, { className: "h-8 w-8" })}
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.title}</div>
                  <div className="text-sm text-muted-foreground">{stat.subtitle}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Categories */}
        {categories.length > 0 && (
          <motion.div 
            className="grid md:grid-cols-5 gap-4 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-hover p-4 text-center">
                  <div className="text-lg font-semibold text-foreground mb-1">{category.count}</div>
                  <div className="text-sm text-muted-foreground">{category.name}</div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Featured Post */}
        {featuredPost && (
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="card-hover p-8 bg-gradient-to-br from-primary/5 to-accent/5 border border-accent/20">
              <Badge variant="secondary" className="mb-4 bg-primary text-primary-foreground">
                Latest Article
              </Badge>
              
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                {stripHtml(featuredPost.title.rendered)}
              </h2>
              <p className="text-muted-foreground mb-6 text-lg">
                {stripHtml(featuredPost.excerpt.rendered).substring(0, 200)}...
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(featuredPost.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {getReadTime(featuredPost.content.rendered || featuredPost.excerpt.rendered)} min read
                </div>
              </div>
              
              <Button 
                variant="default" 
                size="lg"
                onClick={() => window.open(featuredPost.link, '_blank')}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
              >
                Read Full Article
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {posts.slice(1).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="card-hover p-6 h-full flex flex-col">
                <h3 className="text-xl font-bold mb-3 text-foreground line-clamp-2">
                  {stripHtml(post.title.rendered)}
                </h3>
                <p className="text-muted-foreground mb-4 flex-grow line-clamp-3">
                  {stripHtml(post.excerpt.rendered).substring(0, 120)}...
                </p>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {getReadTime(post.content.rendered || post.excerpt.rendered)} min
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group mt-auto"
                  onClick={() => window.open(post.link, '_blank')}
                >
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {error && (
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 border-destructive/20 bg-destructive/5">
              <p className="text-destructive">
                {error}. Showing sample articles for demonstration.
              </p>
            </Card>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border border-accent/20">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Visit Sarthak Devs Blog
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Explore the complete collection of programming tutorials, tech insights, 
              and industry best practices from a seasoned full-stack developer.
            </p>
            <Button 
              variant="default" 
              size="lg"
              onClick={() => window.open('https://sarthakdevs.me/blog', '_blank')}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Visit Full Blog
            </Button>
          </Card>
        </motion.div>
      </div>
    </main>
  );
};

export default BlogPage;