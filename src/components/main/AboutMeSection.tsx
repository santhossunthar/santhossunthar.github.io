'use client'

export const AboutMeSection = () => {
  return (
    <div className="space-y-6 pt-16 pb-32">
      <h3 className="text-2xl font-bold text-cyber-100 border-b border-cyber-400/30 pb-2">
        About Me
      </h3>
      
      <div className="space-y-4 text-cyber-200">
        <p className="text-lg leading-relaxed">
          I'm a passionate Security Researcher and Software Engineer with expertise in 
          cybersecurity, web application security, and secure software development.
        </p>
        
        <p className="text-base leading-relaxed">
          My journey in technology began with a strong foundation in Software Engineering 
          from the University of Kelaniya, where I developed a deep understanding of 
          both development and security practices.
        </p>

        <div className="space-y-3">
          <h4 className="text-xl font-semibold text-cyber-100">Key Expertise:</h4>
          <ul className="space-y-2 text-cyber-300">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyber-400 rounded-full"></span>
              Web Application Security & Penetration Testing
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyber-400 rounded-full"></span>
              Linux System Security & Hardening
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyber-400 rounded-full"></span>
              Secure Software Development Lifecycle
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyber-400 rounded-full"></span>
              Vulnerability Assessment & Risk Analysis
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyber-400 rounded-full"></span>
              Modern Web Technologies (React, Next.js, Node.js)
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xl font-semibold text-cyber-100">Current Focus:</h4>
          <p className="text-base leading-relaxed text-cyber-300">
            I'm currently focused on advancing cybersecurity research, developing secure 
            applications, and sharing knowledge through technical writing and community 
            engagement. My goal is to bridge the gap between development and security 
            practices in modern software engineering.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-xl font-semibold text-cyber-100">Interests:</h4>
          <div className="flex flex-wrap gap-2">
            {['Cybersecurity', 'Web Security', 'Linux', 'Python', 'JavaScript', 'DevOps', 'Cloud Security', 'Penetration Testing'].map((interest) => (
              <span 
                key={interest}
                className="px-3 py-1 bg-cyber-800/50 border border-cyber-400/30 rounded-full text-cyber-200 text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xl font-semibold text-cyber-100">Additional Information:</h4>
          <p className="text-base leading-relaxed text-cyber-300">
            I'm passionate about staying up-to-date with the latest security trends and technologies. 
            I enjoy contributing to open-source projects, writing technical articles, and participating 
            in cybersecurity communities. My goal is to make the digital world more secure through 
            education, research, and practical implementation of security best practices.
          </p>
        </div>
      </div>
    </div>
  );
};
