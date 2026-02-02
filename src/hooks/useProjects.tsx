// @ts-nocheck
// @ts-ignore

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { 
  FaReact, FaNodeJs, FaPython, FaJs, FaHtml5, FaCss3Alt
} from "react-icons/fa6";
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiVite, SiMongodb, SiPostgresql, SiRedis, SiDocker } from "react-icons/si";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  icon: string;
  stats: string;
  gradient: string;
  techStack: Array<{ name: string; icon: string }>;
  metrics: {
    views: string;
    likes: string;
    [key: string]: string;
  };
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: 'Live' | 'Beta' | 'Development' | 'Completed';
  category: 'education' | 'web' | 'ai' | 'mobile' | 'security' | 'game';
}

// Simulated API functions
const fetchProjects = async (): Promise<Project[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return [
    {
      id: '1',
      title: "Python Programming eBooks",
      description: "Comprehensive collection of Python programming eBooks covering 100+ topics from beginner to professional level. Includes OOP, advanced algorithms, security, databases, and modern frameworks.",
      image: "/src/assets/python-ebook.jpg",
      tags: ["Python", "Education", "Technical Writing", "Programming"],
      icon: "BookOpen",
      stats: "100+ Topics Covered",
      gradient: "from-primary to-secondary",
      techStack: [
        { name: "Python", icon: "FaPython" },
        { name: "Education", icon: "BookOpen" },
        { name: "Writing", icon: "Palette" }
      ],
      metrics: {
        views: "10K+",
        likes: "500+",
        downloads: "2K+"
      },
      featured: true,
      status: 'Live' as const,
      category: 'education' as const,
      githubUrl: "https://github.com/example/python-ebooks",
      liveUrl: "https://python-ebooks.example.com"
    },
    {
      id: '2',
      title: "Urban Jiva Blog Platform",
      description: "A comprehensive blogging platform featuring content across 50+ programming languages, tech trends, and digital innovation.",
      image: "/src/assets/workspace.jpg",
      tags: ["Web Development", "Content Platform", "Tech Trends", "Innovation"],
      icon: "Globe",
      stats: "50+ Programming Languages",
      gradient: "from-secondary to-accent",
      techStack: [
        { name: "React", icon: "FaReact" },
        { name: "Node.js", icon: "FaNodeJs" },
        { name: "MongoDB", icon: "SiMongodb" }
      ],
      metrics: {
        views: "25K+",
        likes: "1.2K+",
        users: "5K+"
      },
      featured: true,
      status: 'Live' as const,
      category: 'web' as const,
      githubUrl: "https://github.com/example/urban-jiva",
      liveUrl: "https://urbanjiva.example.com"
    },
    {
      id: '3',
      title: "AI & Automation Projects",
      description: "Collection of AI chatbots, EdTech platforms, freelancing solutions, and smart gadgets.",
      image: "/src/assets/ai-automation.jpg",
      tags: ["AI", "Automation", "Chatbots", "EdTech", "Smart Gadgets"],
      icon: "Bot",
      stats: "Multiple AI Solutions",
      gradient: "from-accent to-primary",
      techStack: [
        { name: "Python", icon: "FaPython" },
        { name: "TypeScript", icon: "SiTypescript" },
        { name: "React", icon: "FaReact" }
      ],
      metrics: {
        views: "15K+",
        likes: "800+",
        deployments: "20+"
      },
      featured: true,
      status: 'Live' as const,
      category: 'ai' as const,
      githubUrl: "https://github.com/example/ai-automation"
    }
  ];
};

const fetchAdditionalProjects = async (): Promise<Omit<Project, 'image' | 'techStack' | 'metrics'>[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: '4',
      title: "EdTech Platform",
      description: "Educational technology platform designed to make learning programming accessible and interactive.",
      tags: ["Education", "React", "Python", "Database"],
      icon: "Code",
      status: "Live" as const,
      featured: true,
      stats: "5K+ Students",
      gradient: "from-blue-500 to-cyan-500",
      category: 'education' as const
    },
    {
      id: '5',
      title: "Freelancing Platform",
      description: "Modern freelancing platform connecting skilled developers with businesses worldwide.",
      tags: ["Web App", "Full Stack", "Business", "Platform"],
      icon: "Globe",
      status: "Beta" as const,
      featured: false,
      stats: "1K+ Freelancers",
      gradient: "from-green-500 to-emerald-500",
      category: 'web' as const
    },
    {
      id: '6',
      title: "Game Development",
      description: "Creative game development projects showcasing technical skills and creative problem-solving.",
      tags: ["Game Dev", "Creative", "Python", "Innovation"],
      icon: "Code",
      status: "Development" as const,
      featured: true,
      stats: "3 Games Released",
      gradient: "from-purple-500 to-pink-500",
      category: 'game' as const
    },
    {
      id: '7',
      title: "Security Tools",
      description: "Advanced security tools and penetration testing utilities for cybersecurity professionals.",
      tags: ["Security", "Python", "Cybersecurity", "Tools"],
      icon: "Shield",
      status: "Live" as const,
      featured: false,
      stats: "Security Certified",
      gradient: "from-red-500 to-orange-500",
      category: 'security' as const
    },
    {
      id: '8',
      title: "Mobile App Suite",
      description: "Cross-platform mobile applications with modern UI/UX and seamless performance.",
      tags: ["Mobile", "Cross-platform", "UI/UX", "Performance"],
      icon: "Smartphone",
      status: "Live" as const,
      featured: true,
      stats: "10K+ Downloads",
      gradient: "from-teal-500 to-blue-500",
      category: 'mobile' as const
    },
    {
      id: '9',
      title: "Award Winning Project",
      description: "Innovative solution that won multiple hackathons and received industry recognition.",
      tags: ["Innovation", "Award", "Hackathon", "Recognition"],
      icon: "Trophy",
      status: "Completed" as const,
      featured: true,
      stats: "3 Awards Won",
      gradient: "from-yellow-500 to-amber-500",
      category: 'ai' as const
    }
  ];
};

const likeProject = async (projectId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  // Simulate API call
};

const viewProject = async (projectId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  // Simulate API call
};

// Custom hooks
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
  });
};

export const useAdditionalProjects = () => {
  return useQuery({
    queryKey: ['additional-projects'],
    queryFn: fetchAdditionalProjects,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
  });
};

export const useLikeProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: likeProject,
    onSuccess: (_, projectId) => {
      // Invalidate and refetch projects data
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['additional-projects'] });
      
      toast({
        title: "Project Liked! ❤️",
        description: "Thanks for showing your appreciation!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to like project. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const useViewProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: viewProject,
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      
      toast({
        title: "Opening Project! 🚀",
        description: "Taking you to the project details...",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to open project. Please try again.",
        variant: "destructive",
      });
    },
  });
};