import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  technologies: string[];
}

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export const ProjectCard = ({ project, className }: ProjectCardProps) => (
  <div className={`w-full group px-2 ${className || ''}`}>
    <Card className="overflow-hidden bg-black border-cyber-400/50 hover:border-cyber-400 shadow-lg hover:shadow-cyber-400/20 transition-all duration-300">
      <div className="flex flex-row items-stretch w-full">
        <div className="relative w-[200px]">
          <div className="absolute inset-0 bg-cyber-400/10 blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
          <Image src={project.image} alt={project.title} width={200} height={256} className="relative h-64 w-full object-cover" />
        </div>

        <div className="flex-1 p-4 flex flex-col justify-between bg-black/95">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-cyber-100 group-hover:text-cyber-200 transition-colors">{project.title}</h3>
            <p className="text-cyber-200/80 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-black border border-cyber-400/30 rounded-md text-sm text-cyber-200 hover:border-cyber-400 hover:text-cyber-100 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <Button asChild className="bg-black hover:bg-cyber-900 text-cyber-100 border border-cyber-400/50 hover:border-cyber-400 shadow-lg hover:shadow-cyber-400/20 transition-all duration-300">
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6">
                View Project
                <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  </div>
);
