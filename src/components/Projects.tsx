import React, { useState } from 'react';
import SimpleBar from 'simplebar-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Filter, Grid3X3, List, RefreshCw, Search,
  BookOpen, Globe, Bot, Smartphone, Shield, Trophy,
  AlertCircle
} from "lucide-react";
import { useProjects, useAdditionalProjects } from "@/hooks/useProjects";
import { ProjectCard, ProjectCardSkeleton } from "@/components/ProjectCard";
import { AdditionalProjectCard, AdditionalProjectCardSkeleton } from "@/components/AdditionalProjectCard";
import { useToast } from "@/hooks/use-toast";

const Projects = () => {
  const [filter, setFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  const { 
    data: projects, 
    isLoading: projectsLoading, 
    error: projectsError,
    refetch: refetchProjects 
  } = useProjects();

  const { 
    data: additionalProjects, 
    isLoading: additionalLoading, 
    error: additionalError,
    refetch: refetchAdditional 
  } = useAdditionalProjects();

  const categories = [
    { id: 'all', name: 'All Projects', icon: Grid3X3, count: ((projects?.length || 0) + (additionalProjects?.length || 0)) },
    { id: 'education', name: 'Education', icon: BookOpen, count: 0 },
    { id: 'web', name: 'Web Dev', icon: Globe, count: 0 },
    { id: 'ai', name: 'AI & ML', icon: Bot, count: 0 },
    { id: 'mobile', name: 'Mobile', icon: Smartphone, count: 0 },
    { id: 'security', name: 'Security', icon: Shield, count: 0 },
    { id: 'game', name: 'Games', icon: Trophy, count: 0 }
  ];

  const handleRefresh = async () => {
    try {
      await Promise.all([refetchProjects(), refetchAdditional()]);
      toast({
        title: "Projects Refreshed! 🔄",
        description: "Latest project data has been loaded.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh projects. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredProjects = projects?.filter(project => 
    filter === 'all' || project.category === filter
  );

  const filteredAdditional = additionalProjects?.filter(project => 
    filter === 'all' || project.category === filter
  );

  if (projectsError || additionalError) {
    return (
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Failed to Load Projects</h2>
          <p className="text-muted-foreground mb-6">
            There was an error loading the projects. Please try again.
          </p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            A showcase of innovative projects spanning education, AI, automation, and web development
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <SimpleBar style={{ maxHeight: '100px' }} className="flex-1">
            <div className="flex flex-wrap gap-2 pb-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={filter === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(category.id)}
                    className="flex items-center gap-2"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </SimpleBar>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={projectsLoading || additionalLoading}
            >
              <RefreshCw className={`h-4 w-4 ${(projectsLoading || additionalLoading) ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
        
        {/* Main Projects */}
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6 sm:gap-8 mb-12 sm:mb-16`}>
          {projectsLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))
          ) : (
            filteredProjects?.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project}
                index={index}
              />
            ))
          )}
        </div>
        
        {/* Additional Projects Grid */}
        {(additionalLoading || (filteredAdditional && filteredAdditional.length > 0)) && (
          <>
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                <span className="gradient-text">More Projects</span>
              </h3>
              <p className="text-muted-foreground">
                Additional projects and ongoing work
              </p>
            </div>
            
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4 sm:gap-6`}>
              {additionalLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <AdditionalProjectCardSkeleton key={index} />
                ))
              ) : (
                filteredAdditional?.map((project, index) => (
                  <AdditionalProjectCard 
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))
              )}
            </div>
          </>
        )}

        {/* No Results */}
        {!projectsLoading && !additionalLoading && 
         filteredProjects?.length === 0 && filteredAdditional?.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Projects Found</h3>
            <p className="text-muted-foreground mb-6">
              No projects match the selected filter. Try selecting a different category.
            </p>
            <Button onClick={() => setFilter('all')} variant="outline">
              Show All Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;