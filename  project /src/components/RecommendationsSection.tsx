import { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface Recommendation {
  title: string;
  description: string;
  icon: string;
  link: string;
  category: 'dApp' | 'NFT' | 'Tool';
}

interface RecommendationsSectionProps {
  address: string;
  personaType: string;
}

const RecommendationsSection = ({ address, personaType }: RecommendationsSectionProps) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    // In a real app, this would call an API to get personalized recommendations
    // For demo, we'll show different recommendations based on the persona type
    
    const deFiRecommendations = [
      {
        title: 'Aave',
        description: 'Leading DeFi lending protocol with multiple asset support',
        icon: '🏦',
        link: 'https://aave.com',
        category: 'dApp' as const,
      },
      {
        title: 'Uniswap',
        description: 'Decentralized trading protocol for token swaps',
        icon: '🦄',
        link: 'https://uniswap.org',
        category: 'dApp' as const,
      },
      {
        title: 'DeFi Pulse',
        description: 'Track your DeFi portfolio across multiple protocols',
        icon: '📊',
        link: 'https://defipulse.com',
        category: 'Tool' as const,
      },
    ];
    
    const nftRecommendations = [
      {
        title: 'OpenSea',
        description: 'The largest NFT marketplace for digital collectibles',
        icon: '🌊',
        link: 'https://opensea.io',
        category: 'dApp' as const,
      },
      {
        title: 'SuperRare',
        description: 'Curated marketplace for unique digital artworks',
        icon: '🖼️',
        link: 'https://superrare.com',
        category: 'dApp' as const,
      },
      {
        title: 'NFT Scan',
        description: 'Track your NFT portfolio and discover new collections',
        icon: '🔍',
        link: 'https://example.com/nftscan',
        category: 'Tool' as const,
      },
    ];
    
    const investorRecommendations = [
      {
        title: 'Zapper',
        description: 'Dashboard to track and manage your DeFi portfolio',
        icon: '⚡',
        link: 'https://zapper.fi',
        category: 'Tool' as const,
      },
      {
        title: 'DeBank',
        description: 'Portfolio tracker for all your DeFi investments',
        icon: '🏛️',
        link: 'https://debank.com',
        category: 'Tool' as const,
      },
      {
        title: 'Compound',
        description: 'Earn interest on your crypto assets',
        icon: '💰',
        link: 'https://compound.finance',
        category: 'dApp' as const,
      },
    ];
    
    if (personaType.includes('DeFi')) {
      setRecommendations(deFiRecommendations);
    } else if (personaType.includes('Collect')) {
      setRecommendations(nftRecommendations);
    } else {
      setRecommendations(investorRecommendations);
    }
  }, [address, personaType]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Recommended for You</h3>
        <button className="text-primary-400 text-sm flex items-center hover:text-primary-300 transition-colors">
          <span>View all</span>
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {recommendations.map((rec, index) => (
          <motion.div 
            key={index} 
            className="bg-background-dark rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-colors"
            variants={itemVariants}
          >
            <div className="flex items-start">
              <div className="text-2xl mr-3">{rec.icon}</div>
              <div>
                <h4 className="font-medium">{rec.title}</h4>
                <p className="text-sm text-gray-400 mt-1">{rec.description}</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between items-center">
              <span className="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400">
                {rec.category}
              </span>
              <a 
                href={rec.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 flex items-center text-sm"
              >
                <span className="mr-1">Visit</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RecommendationsSection;