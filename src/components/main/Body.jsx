import { motion } from 'framer-motion';
import { projectData } from '@/data/constants';
import { ProjectCard } from '../shared/ProjectCard';
import { SocialLinks } from '../shared/SocialLinks';

export const Body = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="w-full h-screen flex flex-col relative"
  >
    {/* Fixed Header Section */}
    <div className="sticky top-0 z-10 py-6 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-cyber-100">
            Projects
          </h2>
          <p className="text-cyber-300">
            Explore my recent work and contributions
          </p>
        </div>
        <div className="hidden md:flex">
          <SocialLinks minimal />
        </div>
      </div>
    </div>

    {/* Scrollable Project Section */}
    <div className="flex-1 overflow-y-auto pt-6 hide-scrollbar">
      <div className="flex flex-col gap-6">
        {projectData.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project}
            className="
              w-full 
              max-w-2xl 
              mx-auto 
              transition-all 
              duration-300 
              hover:scale-[1.02]"
          />
        ))}
      </div>
    </div>
  </motion.div>
);