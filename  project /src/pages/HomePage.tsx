import { motion } from 'framer-motion';
import WalletLookup from '../components/WalletLookup';
import { Hexagon, Zap, Shield, UserCircle } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <UserCircle className="h-6 w-6 text-primary-400" />,
      title: 'Persona Analysis',
      description: 'Discover your unique Web3 identity based on your on-chain activity and interactions.',
    },
    {
      icon: <Zap className="h-6 w-6 text-accent-400" />,
      title: 'Smart Recommendations',
      description: 'Get personalized dApp, NFT, and investment recommendations based on your persona.',
    },
    {
      icon: <Shield className="h-6 w-6 text-secondary-400" />,
      title: 'Privacy Focused',
      description: 'All analysis is done client-side with no data storage or tracking of wallet activities.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <section className="py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Hexagon className="h-16 w-16 text-primary-500" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ 
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Hexagon className="h-8 w-8 text-primary-300" />
              </motion.div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text">
            Web3 Wallet Persona Engine
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover what your wallet says about you. Analyze on-chain activity to reveal your unique Web3 identity.
          </p>
        </motion.div>

        <WalletLookup />
      </section>

      <section className="py-12">
        <motion.h2 
          className="text-2xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Unlock the Power of Your On-Chain Identity
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="p-4 bg-gray-800/50 rounded-full w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <motion.div 
          className="card bg-gradient-to-br from-background-card to-background-dark border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to discover your Web3 persona?</h2>
            <p className="text-gray-400 mb-6">
              Enter your wallet address above to see what your on-chain activity reveals about you.
            </p>
            <a href="#" className="btn-primary inline-flex items-center">
              <Hexagon className="h-4 w-4 mr-2" />
              Learn more about our methodology
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;