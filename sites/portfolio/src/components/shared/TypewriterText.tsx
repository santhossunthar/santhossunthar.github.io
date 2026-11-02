interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export const TypewriterText = ({ text, className = '' }: TypewriterTextProps) => {
  return <span className={className}>{text}</span>;
};
