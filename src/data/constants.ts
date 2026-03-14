import { 
  FaGithub, 
  FaLinkedinIn, 
  FaMedium,
  FaHackerrank, 
  FaStackOverflow
} from 'react-icons/fa';
import { SiGmail, SiTryhackme } from 'react-icons/si';
import { BsTwitterX } from 'react-icons/bs';
import { BlogIcon } from '../components/shared/BlogIcon';

export const socialLinks = [
  {
    Icon: SiGmail,
    href: "mailto:santhos.sunthar@outlook.com",
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
  {
    Icon: FaMedium,
    href: "https://medium.com/@santhossunthar",
    label: "Medium"
  },
  {
    Icon: BlogIcon,
    href: "/blog",
    label: "Blog"
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

export const aboutContent = {
  title: "About Me",
  paragraphs: [
    "I am a cybersecurity professional with both academic and industry experience \
    in securing modern digital environments. Contributing to security \
    operations, threat analysis, and vulnerability management. Experienced \
    in network security, application security, incident response, penetration \
    testing, vulnerability assessment, and red team operations. I am passionate \
    about continuous learning and staying up to date with emerging \
    cybersecurity threats.",
    "With a BSc (Hons) in Software Engineering, I decided to blend my \
    coding skills with my passion for Cybersecurity. Building tools, \
    automating attack simulations, and understanding systems from both \
    a developer's and an attacker's perspective. This combination has \
    shaped the way I think!"
  ]
};

export const educationContent = {
  title: "Education",
  items: [
    {
      degree: "BSc (Hons) in Software Engineering",
      institution: "University of Kelaniya, Sri Lanka",
      startDate: "2021",
      endDate: "2025",
      status: "Strong foundation in software development, system design, \
        and security"
    }
  ]
};

export const expertiseContent = {
  title: "Key Expertise",
  items: [
    "Network Security & Penetration Testing",
    "Application Security & Penetration Testing",
    "Vulnerability Assessment & Risk Analysis",
    "Secure Software Development Lifecycle",
    "Active Directory Security & Hardening",
    "Incident Response & Threat Analysis",
  ]
};

export const certificationsContent = {
  title: "Certifications",
  items: [
    {
      name: "CPTS",
      fullName: "Certified Penetration Testing Specialist",
      issuer: "Hack The Box",
      logo: "/images/CPTS.png",
      verifyUrl: "https://www.credly.com/badges/77c4aaa4-63bd-4f9f-a27d-0f2042185f28/public_url"
    },
    {
      name: "CRTO",
      fullName: "Certified Red Team Operator",
      issuer: "Zero-Point Security",
      logo: "/images/CRTO.png",
      verifyUrl: "https://certs.zeropointsecurity.co.uk/5ce3433c-101a-4555-bac2-26369fb46c92#acc.mHB5f2Zs"
    }
  ]
};

export const interestsContent = {
  title: "Interests & Technologies",
  tags: [
    "Network Security",
    "Application Security",
    "Cloud Security",
    "Penetration Testing",
    "Red Team Operations",
    "Vulnerability Assessment",
    "Incident Response",
    "Threat Intelligence",
    "Risk Analysis",
    "Security Automation",
    "DevSecOps",
    "Linux",
    "Bash",
    "Windows",
    "PowerShell",
    "Python",
    "Rust",
    "JavaScript",
    "Docker",
    "CI/CD",
  ],
  description: "I'm passionate about staying up-to-date with the latest \
    security trends and technologies. I enjoy contributing to open-source \
    projects, writing technical articles, and participating in cybersecurity \
    communities. My goal is to make the digital world more secure through \
    education, research, and practical implementation of security best \
    practices."
};

export const animationTiming = {
  titleDelay: 500,
  itemDelay: 1000,
  itemInterval: 500,
  tagInterval: 150,
  descriptionDelay: 3000
};

export const mainSectionConfig = {
  intro: {
    firstFlashOffMs: 140,
    secondFlashOnMs: 430,
    secondFlashOffMs: 580,
    introEndMs: 1200,
  },
  rings: {
    outerRotations: [0, 90, 180, 270],
    middleRotations: [45, 135, 225, 315],
    innerRotations: [30, 150, 270],
    dotRotations: [60, 180, 300],
  },
  profile: {
    name: 'SANTHOS SUNTHARALINGAM',
    title: 'CYBERSECURITY ENGINEER',
    degree: 'BSc (Hons) in Software Engineering',
    university: 'University of Kelaniya, Sri Lanka',
    imageSrc: '/images/picture.jpg',
    imageAlt: 'Profile',
  },
};
