import { 
  FaGithub, 
  FaLinkedinIn, 
  FaHackerrank, 
  FaStackOverflow 
} from 'react-icons/fa';
import { SiGmail, SiTryhackme } from 'react-icons/si';
import { BsTwitterX } from 'react-icons/bs';

export const socialLinks = [
  {
    Icon: SiGmail,
    href: "mailto:santhoshsunthar@gmail.com",
    label: "Email"
  },
  {
    Icon: FaLinkedinIn,
    href: "https://linkedin.com/in/santhossunthar",
    label: "LinkedIn"
  },
  {
    Icon: FaGithub,
    href: "https://github.com/santhossunthar",
    label: "GitHub"
  },
];

export const projectData = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Personal portfolio website built with React and Tailwind CSS",
    image: "/images/portfolio.png",
    url: "https://github.com/santhossunthar/portfolio",
    technologies: ["React", "Tailwind CSS", "Framer Motion"]
  },
  {
    id: 2,
    title: "Secure Chat Application",
    description: "End-to-end encrypted chat application with real-time messaging",
    image: "/images/chat.png",
    url: "https://github.com/santhossunthar/secure-chat",
    technologies: ["Node.js", "Socket.io", "Crypto"]
  },
  {
    id: 3,
    title: "Vulnerability Scanner",
    description: "Automated web application vulnerability scanner",
    image: "/images/scanner.png",
    url: "https://github.com/santhossunthar/vuln-scanner",
    technologies: ["Python", "SQLite", "Beautiful Soup"]
  },
  {
    id: 4,
    title: "Network Monitor",
    description: "Real-time network traffic monitoring and analysis tool",
    image: "/images/monitor.png",
    url: "https://github.com/santhossunthar/network-monitor",
    technologies: ["C++", "Qt", "libpcap"]
  }
];