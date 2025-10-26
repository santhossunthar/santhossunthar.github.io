'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProfilePictureProps {
  showGlitch: boolean;
}

export const ProfilePicture = ({ showGlitch }: ProfilePictureProps) => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex items-center"
    >
      <div className="relative w-full min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-28">
              {[0, 90, 180, 270].map((rotation) => (
                <div
                  key={`outer-${rotation}`}
                  className="absolute w-full h-full"
                  style={{ 
                    transform: `rotate(${rotation}deg)` 
                  }}
                >
                  <div className="
                    absolute 
                    top-0 
                    left-1/2 
                    w-[3px] 
                    h-16 
                    bg-gradient-to-b 
                    from-cyber-400 
                    to-transparent 
                    -translate-x-1/2 
                    origin-bottom" 
                  />
                </div>
              ))}
            </div>

            <div className="absolute -inset-20">
              {[45, 135, 225, 315].map((rotation) => (
                <div
                  key={`middle-${rotation}`}
                  className={`absolute w-full h-full ${showGlitch ? 'animate-spin-slower' : ''}`}
                  style={{ 
                    transform: `rotate(${rotation}deg)` 
                  }}
                >
                  <div className="
                    absolute top-0 
                    left-1/2 
                    w-[2px] 
                    h-14 
                    bg-gradient-to-b 
                    from-cyber-300 
                    to-transparent 
                    -translate-x-1/2" 
                  />
                </div>
              ))}
            </div>

            <div className="absolute -inset-16">
              {[30, 150, 270].map((rotation) => (
                <div
                  key={`inner-${rotation}`}
                  className={`absolute w-full h-full ${showGlitch ? 'animate-pulse-slow' : ''}`}
                  style={{ 
                    transform: `rotate(${rotation}deg)` 
                  }}
                >
                  <div className="
                    absolute 
                    top-0 
                    left-1/2 
                    -translate-x-1/2 
                    w-[50%] 
                    h-[2px] 
                    rounded-full
                    bg-gradient-to-r 
                    from-transparent 
                    via-cyber-200 
                    to-transparent" 
                  />
                </div>
              ))}
            </div>

            <div className="relative rounded-full overflow-hidden flex items-center justify-center">
              <Image
                src="/images/picture.jpg"
                alt="Profile"
                width={320}
                height={320}
                className="
                  relative 
                  h-80 
                  w-80 
                  rounded-full 
                  object-cover 
                  border-2 border-cyber-900"
              />
              <div className="
                absolute 
                inset-0 
                rounded-full 
                bg-gradient-radial 
                from-cyber-400/10 
                via-transparent 
                to-transparent" 
              />
            </div>

            {[60, 180, 300].map((rotation) => (
              <div
                key={`dot-${rotation}`}
                className="
                  absolute 
                  w-2 
                  h-2 
                  rounded-full 
                  bg-cyber-400/80"
                style={{
                  left: `calc(50% + ${
                    Math.cos(
                      rotation * Math.PI / 180
                    ) * 200}px)`,
                  top: `calc(50% + ${
                    Math.sin(
                      rotation * Math.PI / 180
                    ) * 200}px)`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
