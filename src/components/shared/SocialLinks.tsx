import { Button } from "@/components/ui/button";
import { socialLinks } from "@/data/constants";

interface SocialLinksProps {
  minimal?: boolean;
}

export const SocialLinks = ({ minimal = false }: SocialLinksProps) => (
  <div className={minimal ? "flex flex-wrap gap-2" : "flex flex-col gap-3"}>
    {socialLinks.map((link, index) => (
      <Button
        key={index}
        variant={minimal ? "outline" : "ghost"}
        size={minimal ? "icon" : "default"}
        asChild
        className={
          minimal
            ? `
              p-3
              rounded-full
              bg-cyber-800/80
              hover:bg-cyber-700
              border
              border-cyber-600/50
              transition-all
              duration-300
              hover:border-cyber-400
              cyber-glow
              group
              hover:scale-110
              `
            : `
              w-full
              justify-start
              px-4
              py-2
              rounded-lg
              bg-cyber-900/80
              border border-cyber-400/30
              text-cyber-200
              hover:bg-cyber-800
              hover:border-cyber-400
              hover:text-cyber-100
              transition-all
              duration-300
              shadow
              group
            `
        }
      >
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <span className={minimal
            ? "text-cyber-400 group-hover:text-cyber-100 transition-colors duration-200"
            : "text-cyber-400 group-hover:text-cyber-100 transition-colors duration-200"
          }>
            <link.Icon className="w-5 h-5" />
          </span>
          {!minimal && (
            <span className="ml-2 font-medium tracking-wide">
              {link.label}
            </span>
          )}
        </a>
      </Button>
    ))}
  </div>
);
