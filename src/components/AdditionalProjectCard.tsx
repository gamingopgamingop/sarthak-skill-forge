// AdditionalProjectCard.tsx
// @ts-nocheck
// @ts-ignore
import React from 'react';
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { 
  ExternalLink, Github, Star,
  BookOpen, Globe, Bot, Code, Brain, Zap, 
  Smartphone, Database, Server, Palette, Shield, Trophy
} from "lucide-react";
import { 
  FaReact, FaNodeJs, FaPython, FaJs, FaHtml5, FaCss3Alt
} from "react-icons/fa6";
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiVite, SiMongodb, SiPostgresql, SiRedis, SiDocker } from "react-icons/si";
import { useLikeProject, useViewProject } from "../hooks/useProjects";

const iconMap = {
  BookOpen, Globe, Bot, Code, Brain, Zap, 
  Smartphone, Database, Server, Palette, Shield, Trophy,
  FaReact, FaNodeJs, FaPython, FaJs, FaHtml5, FaCss3Alt,
  SiTypescript, SiTailwindcss, SiNextdotjs, SiVite, SiMongodb, SiPostgresql, SiRedis, SiDocker
};

interface AdditionalProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  status: 'Live' | 'Beta' | 'Development' | 'Completed';
  featured: boolean;
  stats: string;
  gradient: string;
  category: string;
}

interface AdditionalProjectCardProps {
  project: AdditionalProject;
  index: number;
}

export const AdditionalProjectCard: React.FC<AdditionalProjectCardProps> = ({ project, index }) => {
  const likeProjectMutation = useLikeProject();
  const viewProjectMutation = useViewProject();
  
  const IconComponent = iconMap[project.icon as keyof typeof iconMap] || Code;
  
  const handleLike = () => {
    likeProjectMutation.mutate(project.id);
  };
  
  const handleView = () => {
    viewProjectMutation.mutate(project.id);
  };

  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Beta':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Development':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Completed':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <Card 
      className={`card-hover p-4 sm:p-6 relative overflow-hidden ${
        project.featured ? 'ring-2 ring-accent/20' : ''
      }`}
      style={{ animationDelay: `${(index + 3) * 0.1}s` }}
    >
      {project.featured && (
        <div className="absolute top-2 right-2">
          <div className="flex items-center gap-1 bg-gradient-to-r from-accent to-primary text-background px-2 py-1 rounded-full text-xs font-medium">
            <Star className="h-3 w-3" />
            Featured
          </div>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row sm:items-center mb-3 sm:mb-4 gap-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${project.gradient} w-fit`}>
          <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-background" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="secondary"
              className={`text-xs ${getStatusBadgeStyles(project.status)}`}
            >
              {project.status}
            </Badge>
            <span className="text-xs text-muted-foreground">{project.stats}</span>
          </div>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, tagIndex) => (
          <Badge 
            key={tagIndex} 
            variant="secondary" 
            className="bg-muted/10 text-foreground border border-accent/20 text-xs hover:bg-accent/10 transition-colors"
          >
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="flex gap-2 pt-2 border-t border-accent/10">
        <Button 
          variant="tech" 
          size="sm" 
          className="flex-1"
          onClick={handleView}
          disabled={viewProjectMutation.isPending}
        >
          <ExternalLink className="mr-2 h-3 w-3" />
          {viewProjectMutation.isPending ? 'Opening...' : 'View'}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleLike}
          disabled={likeProjectMutation.isPending}
        >
          <Github className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
};

export const AdditionalProjectCardSkeleton: React.FC = () => (
  <Card className="p-4 sm:p-6">
    <div className="flex gap-3 mb-4">
      <Skeleton className="h-10 w-10 rounded-lg" />
      <div className="flex-1">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-2/3 mb-4" />
    <div className="flex gap-2 mb-4">
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-6 w-20" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-8 flex-1" />
      <Skeleton className="h-8 w-10" />
    </div>
  </Card>
);