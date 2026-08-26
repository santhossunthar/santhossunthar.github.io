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
    "Hello! Curious to know me better? I am a cybersecurity professional on a mission \
      to defend information systems. My interest in cybersecurity began in childhood \
      through a curiosity about how software systems worked, which gradually evolved \
      into a passion for ethical hacking, security research, and securing modern digital \
      environments. I focus on threat analysis and vulnerability research. A strong \
      offensive mindset is essential \
      for building stronger defenses. That is why I blend offensive security skills \
      with defensive operations to help protect the digital world.",
    "I have helped secure workplaces with my ethical hacking and penetration \
    testing skills. I build security automation tools to help organizations \
    and community members protect their systems. I make it a priority to \
    understand systems deeply before attempting to break and test them. \
    This approach has shaped who I am today."
  ]
};

export const workHistoryContent = {
  title: "Professional Experience",
  items: [
    {
      name: "iVedha Inc",
      fullName: "iVedha Inc.",
      location: "Toronto, Ontario, Canada (Remote)",
      startDate: "Feb 2024",
      endDate: "Present",
      logo: "/images/iVedha-logo.png",
      bgImage: "/images/iVedha-bg.png",
      bgScale: 1.2,
      bgPosition: "center center",
      roles: [
        {
          title: "Cybersecurity Engineer",
          startDate: "Jul 2025",
          endDate: "Present",
          description: "Leading security engineering initiatives and building automation-focused defense workflows.",
        },
        {
          title: "Associate Cybersecurity Analyst",
          startDate: "Aug 2024",
          endDate: "Jun 2025",
          description: "Supported security operations, vulnerability review, and internal security assessments.",
        },
        {
          title: "Cybersecurity Intern",
          startDate: "Feb 2024",
          endDate: "Jul 2024",
          description: "Gained hands-on experience in security testing, analysis, and internal processes.",
        },
      ],
    },
  ],
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
      name: "C|PENT",
      fullName: "Certified Penetration Testing Professional (C|PENT)",
      issuer: "EC-Council",
      issuedDate: "August 2026",
      logo: "/images/CPENT.png",
      logoScale: 1.52,
      logoOffsetY: "-14%",
      bgImage: "/images/cpent-logo.jpg",
      bgScale: 0.85,
      bgPosition: "right center",
      bgOffsetX: "12%",
      bgLeftFadeEnd: "89%",
      bgRightFadeStart: "92%",
      verifyUrl: "https://aspen.eccouncil.org/VerifyBadge?type=certification&a=cDsN87WCe+xTSvrso1MkqSmvuSTJkosbY7hYj7jCZFc="
    },
    {
      name: "CPTS",
      fullName: "Certified Penetration Testing Specialist (CPTS)",
      issuer: "Hack The Box",
      issuedDate: "February 2026",
      logo: "/images/CPTS.png",
      logoScale: 1.52,
      bgImage: "/images/cpts-logo.png",
      bgScale: 0.9,
      bgPosition: "right center",
      verifyUrl: "https://www.credly.com/badges/77c4aaa4-63bd-4f9f-a27d-0f2042185f28/public_url"
    },
    {
      name: "CRTO",
      fullName: "Certified Red Team Operator (CRTO)",
      issuer: "Zero-Point Security",
      issuedDate: "February 2026",
      logo: "/images/CRTO.png",
      logoScale: 1.52,
      bgImage: "/images/crto-logo.png",
      bgFlipHorizontal: true,
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
    "Adversary Simulation",
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
    "Jenkins",
    "Azure Sentinel",
    "SentinelOne",
    "ELK Stack",
    "Wazuh",
    "Ansible"
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
    title: 'CYBERSECURITY PROFESSIONAL',
    degree: 'BSc (Hons) in Software Engineering',
    university: 'University of Kelaniya, Sri Lanka',
    summary:
      'Passionate about ethical hacking, penetration testing and \
       proactive defense. I specialize in analyzing threats, hardening \
       systems, and continuously learning to stay ahead of evolving attacks.',
    imageSrc: '/images/profile-picture.jpg',
    imageAlt: 'Profile',
  },
};

export const homePageConfig = {
  topNavTitle: 'SANTHOS',
  topNavShowThresholdRatio: 0.6,
};

export const pinnedProjectsConfig = {
  profileUrl: 'https://github.com/santhossunthar?tab=repositories',
  projects: [
    {
      name: 'TestX',
      description: 'AI Powered Chrome DevTools Extension for automated security testing',
      language: 'HTML',
      url: 'https://github.com/santhossunthar/TestX',
    },
    {
      name: 'OpenSOC',
      description: 'AI Powered Automated SOC operations',
      language: 'Go',
      url: 'https://github.com/santhossunthar/OpenSOC',
    },
    {
      name: 'SecureWebApp',
      description: 'Implementation of secure SSO workflow',
      language: 'Java',
      url: 'https://github.com/santhossunthar/SecureWebApp',
    },
    {
      name: 'EnDe',
      description: 'Password manager for windows systems',
      language: 'Python',
      url: 'https://github.com/santhossunthar/EnDe',
    },
    {
      name: 'myRecon',
      description: 'Automated recon tool for bug bounty hunters',
      language: 'Shell',
      url: 'https://github.com/santhossunthar/myRecon',
    },
    {
      name: 'Tent',
      description: 'Q&A Android App for discussions',
      language: 'Java',
      url: 'https://github.com/santhossunthar/Tent',
    },
  ],
};
