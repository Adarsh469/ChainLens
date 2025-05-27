import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

const WalletLookup = () => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEthereumAddress = (addr: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(addr);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!address.trim()) {
      setError('Please enter a wallet address');
      return;
    }
    
    if (!validateEthereumAddress(address.trim())) {
      setError('Please enter a valid Ethereum address');
      return;
    }
    
    setError('');
    navigate(`/persona/${address.trim()}`);
  };

  return (
    <motion.div 
      className="card max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Discover Your Web3 Persona</h2>
        <p className="text-gray-400">
          Enter an Ethereum wallet address to analyze on-chain activity and generate a unique persona
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Wallet className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            className="wallet-input pl-10"
            aria-label="Wallet address input"
          />
        </div>
        
        {error && (
          <p className="text-error-400 text-sm">{error}</p>
        )}
        
        <button
          type="submit"
          className="btn-primary w-full flex items-center justify-center"
        >
          <Search className="h-4 w-4 mr-2" />
          Analyze Wallet
        </button>
      </form>
      
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-900 p-2 rounded-full">
              <Wallet className="h-5 w-5 text-primary-300" />
            </div>
            <span className="text-sm text-gray-300">Privacy-Focused Analysis</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-secondary-900 p-2 rounded-full">
              <Wallet className="h-5 w-5 text-secondary-300" />
            </div>
            <span className="text-sm text-gray-300">Multi-Chain Support</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-accent-900 p-2 rounded-full">
              <Wallet className="h-5 w-5 text-accent-300" />
            </div>
            <span className="text-sm text-gray-300">AI-Powered Insights</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WalletLookup;