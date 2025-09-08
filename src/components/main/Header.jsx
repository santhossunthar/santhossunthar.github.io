import { motion } from 'framer-motion';

export const Header = () => (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      className="fixed top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container relative h-16">
        <div className="flex h-full items-center">
          <span className="text-xl font-bold">Santhos Suntharalingam</span>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2"
        >
          <img
            src="/images/picture.jpg"
            alt="Profile"
            className="h-24 w-24 rounded-full border-4 border-background object-cover shadow-xl"
          />
        </motion.div>
      </div>
    </motion.header>
  );