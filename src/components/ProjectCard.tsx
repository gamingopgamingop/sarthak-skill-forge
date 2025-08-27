import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ExternalLink, Github, Eye, Heart, Star, 
  BookOpen, Globe, Bot, Code, Brain, Zap, 
  Smartphone, Database, Server, Palette, Shield, Trophy
} from "lucide-react";
import { 
  FaReact, FaNodeJs, FaPython, FaJs, FaHtml5, FaCss3Alt
} from "react-icons/fa6";
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiVite, SiMongodb, SiPostgresql, SiRedis, SiDocker } from "react-icons/si";
import { Project, useLikeProject, useViewProject } from "@/hooks/useProjects";

const iconMap = {
  BookOpen, Globe, Bot, Code, Brain, Zap, 
  Smartphone, Database, Server, Palette, Shield, Trophy,
  FaReact, FaNodeJs, FaPython, FaJs, FaHtml5, FaCss3Alt,
  SiTypescript, SiTailwindcss, SiNextdotjs, SiVite, SiMongodb, SiPostgresql, SiRedis, SiDocker
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const likeProjectMutation = useLikeProject();
  const viewProjectMutation = useViewProject();
  
  const IconComponent = iconMap[project.icon as keyof typeof iconMap] || Code;
  
  const handleLike = () => {
    likeProjectMutation.mutate(project.id);
  };
  
  const handleView = () => {
    viewProjectMutation.mutate(project.id);
    // In a real app, you'd navigate to the project URL
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank');
    }
  };
  
  const handleGithub = () => {
    if (project.githubUrl) {
      window.open(project.githubUrl, '_blank');
    }
  };

  return (
    <Card 
      className="card-hover group overflow-hidden"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
        
        {/* Project Icon */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${project.gradient}`}>
            <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-background" />
          </div>
        </div>
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            <div className="flex items-center gap-1 bg-gradient-to-r from-accent to-primary text-background px-2 py-1 rounded-full text-xs font-medium">
              <Star className="h-3 w-3" />
              Featured
            </div>
          </div>
        )}
        
        {/* Stats Badge */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
          <Badge variant="secondary" className="bg-background/80 text-foreground text-xs sm:text-sm">
            {project.stats}
          </Badge>
        </div>
        
        {/* Metrics overlay */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-1">
          <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
            <Eye className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{project.metrics.views}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
          {project.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          {project.tags.map((tag, tagIndex) => (
            <Badge 
              key={tagIndex} 
              variant="secondary" 
              className="bg-muted/10 text-foreground border border-accent/20 text-xs sm:text-sm hover:bg-accent/10 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Tech Stack Icons */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex gap-2">
            {project.techStack.map((tech, techIndex) => {
              const TechIcon = iconMap[tech.icon as keyof typeof iconMap] || Code;
              return (
                <div 
                  key={techIndex}
                  className="group relative"
                >
                  <div className="p-2 rounded-full bg-muted/10 border border-accent/20 hover:bg-accent/10 transition-colors">
                    <TechIcon className="h-4 w-4 text-foreground" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {tech.name}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <button 
              onClick={handleLike}
              disabled={likeProjectMutation.isPending}
              className="flex items-center gap-1 hover:text-red-500 transition-colors"
            >
              <Heart className="h-3 w-3" />
              <span>{project.metrics.likes}</span>
            </button>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button 
            variant="tech" 
            size="sm" 
            className="flex-1"
            onClick={handleView}
            disabled={viewProjectMutation.isPending}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            {viewProjectMutation.isPending ? 'Opening...' : 'View Project'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="sm:w-auto"
            onClick={handleGithub}
            disabled={!project.githubUrl}
          >
            <Github className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export const ProjectCardSkeleton: React.FC = () => (
  <Card className="overflow-hidden">
    <Skeleton className="w-full h-40 sm:h-48" />
    <div className="p-4 sm:p-6">
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-14" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 w-12" />
      </div>
    </div>
  </Card>
);