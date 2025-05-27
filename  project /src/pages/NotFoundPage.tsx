import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-background-card p-6 rounded-full mb-6 inline-block">
          <AlertTriangle className="h-16 w-16 text-warning-500" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/" 
          className="btn-primary flex items-center justify-center mx-auto w-fit"
        >
          <Home className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;