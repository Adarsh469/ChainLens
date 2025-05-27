import { useEffect, useState } from 'react';
import { getWalletRiskScore, getRecommendations } from '../utils/walletUtils';
import { WalletPersona } from '../types/wallet';
import {
  Sparkles,
  Shield,
  HeartPulse,
  ThumbsUp,
  BadgePercent,
  BadgeDollarSign,
  Building2,
  Scale,
  TrendingUp,
  Award,
  User2,
} from 'lucide-react';

interface WalletInsightsProps {
  address: string;
  persona: WalletPersona | null;
}

const emojiPersona: Record<string, string> = {
  Trader: '💹',
  Holder: '🪙',
  'Active User': '⚡',
  'New Explorer': '🧭',
  'Regular User': '👤',
  'Casual Participant': '🌱',
  'Active Trader': '🚀',
};

const emojiDapps: Record<string, string> = {
  Uniswap: '🦄',
  Aave: '🏦',
  'dYdX': '⚖️',
  Zapper: '💧',
  'Argent Wallet': '🦊',
  Snapshot: '📸',
  Gitcoin: '💰',
  OpenSea: '🌊',
  ENS: '🔗',
};

const healthEmoji = (score: number) =>
  score > 80 ? '🟢' : score > 60 ? '🟡' : '🔴';

const WalletInsights = ({ address, persona }: WalletInsightsProps) => {
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    if (!address) return;
    getWalletRiskScore(address).then(setRiskScore);
  }, [address]);

  useEffect(() => {
    if (persona) setRecommendations(getRecommendations(persona));
    else setRecommendations([]);
  }, [persona]);

  if (!persona) return null;

  return (
    <div className="card p-6 mt-8">
      <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 text-primary-200">
        <Sparkles className="h-5 w-5 text-primary-400" />
        Wallet Insights
      </h3>
      <div className="mb-2 flex items-center gap-2">
        <Shield className="h-4 w-4 text-secondary-400" />
        <span className="font-semibold text-secondary-300">Persona:</span>
        <span className="flex items-center gap-1 ml-1">
          <span className="text-xl">{emojiPersona[persona.title] ?? '👤'}</span>
          {persona.title}
        </span>
        <span className="text-gray-400 ml-2">– {persona.description}</span>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <HeartPulse className="h-4 w-4 text-red-400" />
        <span className="font-semibold text-secondary-300">Wallet Health Score:</span>
        <span className={`ml-1 font-mono flex items-center gap-1 ${riskScore !== null && riskScore > 70 ? "text-green-400" : riskScore && riskScore > 40 ? "text-yellow-400" : "text-red-400"}`}>
          {riskScore !== null ? (
            <>
              <span className="text-xl mr-1">{healthEmoji(riskScore)}</span>
              {riskScore} / 100
            </>
          ) : (
            "..."
          )}
        </span>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <ThumbsUp className="h-4 w-4 text-blue-400" />
        <span className="font-semibold text-secondary-300">Personalized Recommendations:</span>
      </div>
      <ul className="ml-7 mt-1 space-y-1">
        {recommendations.length === 0 && <li className="text-gray-400">No recommendations found.</li>}
        {recommendations.map((rec, idx) => (
          <li key={idx} className="flex items-center gap-2 text-base">
            <span className="text-lg">
              {emojiDapps[rec] ??
                (rec === "Uniswap"
                  ? <BadgePercent className="h-4 w-4 inline" />
                  : rec === "Aave"
                  ? <BadgeDollarSign className="h-4 w-4 inline" />
                  : rec === "dYdX"
                  ? <Scale className="h-4 w-4 inline" />
                  : rec === "Zapper"
                  ? <TrendingUp className="h-4 w-4 inline" />
                  : rec === "Argent Wallet"
                  ? <Award className="h-4 w-4 inline" />
                  : rec === "Snapshot"
                  ? <Building2 className="h-4 w-4 inline" />
                  : rec === "Gitcoin"
                  ? <Star className="h-4 w-4 inline" />
                  : rec === "OpenSea"
                  ? <Gem className="h-4 w-4 inline" />
                  : rec === "ENS"
                  ? <User2 className="h-4 w-4 inline" />
                  : "✨")}
            </span>
            {rec}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletInsights;