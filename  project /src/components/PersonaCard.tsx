import { motion } from 'framer-motion';
import { Award, Clock, Zap, TrendingUp, Wallet } from 'lucide-react';
import { WalletPersona } from '../types/wallet';

interface PersonaCardProps {
  persona: WalletPersona;
}

const PersonaCard = ({ persona }: PersonaCardProps) => {
  const getTraitIcon = (trait: string) => {
    switch (trait) {
      case 'Investor':
        return <TrendingUp className="h-5 w-5 text-accent-400" />;
      case 'Collector':
        return <Award className="h-5 w-5 text-secondary-400" />;
      case 'DeFi User':
        return <Zap className="h-5 w-5 text-primary-400" />;
      default:
        return <Wallet className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <motion.div 
      className="persona-card card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="hexagon bg-gradient-to-br from-primary-700 to-secondary-600 p-4 w-16 h-16 flex items-center justify-center">
          {getTraitIcon(persona.primaryTrait)}
        </div>
        <div>
          <h2 className="text-xl font-bold">{persona.title}</h2>
          <div className="flex items-center text-sm text-gray-400">
            <Clock className="h-3 w-3 mr-1" />
            <span>Joined {persona.firstTransaction}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-300">{persona.description}</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-200">Personality Traits</h3>
        <div className="grid grid-cols-2 gap-3">
          {persona.traits.map((trait, index) => (
            <div 
              key={index} 
              className="flex items-center p-3 rounded-lg bg-background-dark"
            >
              {getTraitIcon(trait.name)}
              <div className="ml-3">
                <div className="font-medium text-sm">{trait.name}</div>
                <div className="text-xs text-gray-400">{trait.level}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="flex justify-between text-sm">
          <div>
            <div className="text-gray-400">Assets</div>
            <div className="font-medium">{persona.stats.assets}</div>
          </div>
          <div>
            <div className="text-gray-400">Transactions</div>
            <div className="font-medium">{persona.stats.transactions}</div>
          </div>
          <div>
            <div className="text-gray-400">Networks</div>
            <div className="font-medium">{persona.stats.networks}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonaCard;