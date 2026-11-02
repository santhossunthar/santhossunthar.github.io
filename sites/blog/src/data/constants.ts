import { FaGithub, FaLinkedinIn, FaMedium } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
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
    href: "/",
    label: "Blog"
  },
];
