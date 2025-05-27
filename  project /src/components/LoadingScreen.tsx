import { motion } from 'framer-motion';
import { Hexagon } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background-dark z-50">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Hexagon className="h-16 w-16 text-primary-500" />
        </motion.div>
        <motion.p
          className="mt-4 text-gray-300 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
};