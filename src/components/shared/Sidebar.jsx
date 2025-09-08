import { SocialLinks } from '../shared/SocialLinks';

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
    {/* Profile Image */}
    <div className="mx-auto mb-6 relative">
      <div className="absolute -inset-2 rounded-full bg-cyber-400/20 blur-lg z-0" />
      <img
        src="/images/picture.jpg"
        alt="Profile"
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
    
    {/* Name and Title */}
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

    {/* Divider */}
    <div className="
      w-full
      h-[2px]
      bg-gradient-to-r
      from-transparent
      via-cyber-400/40
      to-transparent
      mb-6
    " />

    {/* Nav Links */}
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