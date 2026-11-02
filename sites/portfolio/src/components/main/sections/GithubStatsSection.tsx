import { pinnedProjectsConfig } from '@/data/constants';

export const GithubStatsSection = () => {
  const { profileUrl, projects } = pinnedProjectsConfig;

  return (
    <div className="w-full space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-3xl md:text-4xl font-semibold text-cyber-100 text-center md:text-left">
          Projects
        </h4>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-cyan-300 hover:text-cyan-200"
        >
          View All on GitHub
        </a>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {projects.map((project) => (
          <div
            key={project.name}
            className="w-full rounded-lg border border-white/10 bg-black/20 p-4 md:p-5 space-y-2"
          >
            <div className="flex items-start justify-between gap-3">
              <h5 className="text-xl md:text-2xl font-semibold text-cyber-100">
                {project.name}
              </h5>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cyan-300 hover:text-cyan-200 whitespace-nowrap"
              >
                Open Repo
              </a>
            </div>
            <p className="text-cyber-300 text-sm md:text-base">{project.description}</p>
            <div>
              <span className="px-3 py-1.5 bg-cyber-800/50 rounded-full text-cyber-200 text-xs md:text-sm">
                {project.language}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
