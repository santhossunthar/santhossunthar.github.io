import { SocialLinks } from '../shared/SocialLinks';
import Image from 'next/image';

export const Sidebar = () => (
  <div
    className="
      flex flex-col h-full p-6
      bg-cyber-900/80
      rounded-xl
      border border-cyber-400/40
      shadow-xl
      backdrop-blur
      relative
      cyber-glow
    "
  >
    <div className="mx-auto mb-6 relative">
      <div className="absolute -inset-2 rounded-full bg-cyber-400/20 blur-lg z-0" />
      <Image
        src="/images/picture.jpg"
        alt="Profile"
        width={128}
        height={128}
        className="
          h-32
          w-32
          rounded-full
          object-cover
          shadow-xl
          border-2
          border-cyber-400/60
          relative
          z-10
        "
      />
    </div>
    
    <div className="text-center mb-6">
      <h2 className="
        text-xl
        font-bold
        text-cyber-100
        tracking-wide
      ">
        Santhos Suntharalingam
      </h2>
      <p className="
        text-sm
        text-cyber-400/80
      ">
        Security Researcher
      </p>
    </div>

    <div className="
      w-full
      h-[2px]
      bg-gradient-to-r
      from-transparent
      via-cyber-400/40
      to-transparent
      mb-6
    " />

    <nav className="flex flex-col gap-2 mb-8">
      <a
        href="#projects"
        className="
          px-4
          py-2
          rounded-lg
          text-cyber-200
          hover:text-cyber-100
          hover:bg-cyber-800/70
          border border-transparent
          hover:border-cyber-400
          transition-all
          duration-200
          font-medium
          tracking-wide
        "
      >
        Project
      </a>
      <a
        href="#blog"
        className="
          px-4
          py-2
          rounded-lg
          text-cyber-200
          hover:text-cyber-100
          hover:bg-cyber-800/70
          border border-transparent
          hover:border-cyber-400
          transition-all
          duration-200
          font-medium
          tracking-wide
        "
      >
        Blog
      </a>
    </nav>
  </div>
);
