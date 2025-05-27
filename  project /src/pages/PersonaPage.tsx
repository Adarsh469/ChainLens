/**
 * @file PersonaPage.tsx
 * @description Personal page component showing wallet analytics
 * @author Adarsh469
 * @lastModified 2025-05-27 16:10:00
 */

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  Wallet,
  Shield,
  BarChart3,
  Coins,
  Globe2,
  CalendarDays,
  Activity as ActivityIcon,
  Star,
  UserCheck,
  Zap,
  Award
} from 'lucide-react';
import { generateWalletPersona, truncateAddress, getTransactionActivity, generateWalletAIBio } from '../utils/walletUtils';
import { WalletPersona } from '../types/wallet';
import { ActivityData } from '../types/activity';
import ActivityChart from '../components/ActivityChart';
import WalletStats from '../components/WalletStats';
import WalletInsights from '../components/WalletInsights';
import WalletAIBio from '../components/WalletAIBio';

const PersonaPage = () => {
  const { address } = useParams<{ address: string }>();
  const [persona, setPersona] = useState<WalletPersona | null>(null);
  const [activityData, setActivityData] = useState<ActivityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!address) return;
      setLoading(true);
      try {
        const [personaRes, activityRes] = await Promise.all([
          generateWalletPersona(address),
          getTransactionActivity(address),
        ]);
        setPersona(personaRes);
        setActivityData(activityRes);
      } catch (e) {
        setPersona(null);
        setActivityData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [address]);

  // Clipboard copy handler for address
  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Link to="/" className="inline-flex items-center text-primary-400 hover:underline mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back
      </Link>
      <div className="card p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Wallet className="h-6 w-6 text-primary-400" />
              <span className="font-mono text-lg">{truncateAddress(address || "")}</span>
              <button
                onClick={handleCopy}
                title="Copy address"
                className="ml-1 text-gray-400 hover:text-primary-400 transition"
              >
                <Copy className="h-4 w-4" />
              </button>
              <a
                href={`https://etherscan.io/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-400 hover:underline flex items-center"
              >
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              <Wallet className="h-4 w-4" /> Ethereum Wallet
            </p>
          </div>
          {persona && (
            <div className="flex flex-col gap-1">
              <span className="inline-flex items-center gap-1 text-secondary-400 font-semibold">
                <UserCheck className="h-4 w-4" />
                {persona.title}
              </span>
              <span className="text-sm text-gray-400 flex items-center gap-1">
                <Star className="h-4 w-4" /> {persona.description}
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {persona.traits.map((trait) => (
                  <span
                    key={trait.name}
                    className="rounded-full bg-secondary-900/50 px-3 py-1 text-xs text-secondary-300 flex items-center gap-1"
                  >
                    <Award className="h-3 w-3 mr-1" />{trait.name}: {trait.level}
                  </span>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <CalendarDays className="h-3 w-3" /> First Activity: {persona.firstTransaction}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* STATS SECTION */}
      <div className="mb-10">
        <WalletStats address={address!} />
      </div>

      {/* Add a large gap below stats */}
      <div className="my-8" />

      {/* ACTIVITY CHART */}
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold mb-2 text-primary-300">
          <ActivityIcon className="h-6 w-6" /> Transaction Activity
        </h3>
        <ActivityChart address={address!} activityData={activityData} isLoading={loading} />
      </div>
      
      {/* NEW INSIGHTS SECTION */}
      <WalletInsights address={address!} persona={persona} />

      {/* Persona Details */}
      {persona && (
        <div className="card p-6 mt-8">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Shield className="h-5 w-5" /> Persona Details
          </h3>
          <div className="mb-2 flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-secondary-400" />
            <strong>Primary Trait:</strong> {persona.primaryTrait}
          </div>
          <div className="mb-2 flex items-center gap-2">
            <Award className="h-4 w-4 text-accent-400" />
            <strong>Other Traits:</strong>{" "}
            {persona.traits
              .filter((t) => t.name !== persona.primaryTrait)
              .map((t) => `${t.name}: ${t.level}`)
              .join(", ") || "None"}
          </div>
          <div className="mb-2 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary-400" />
            <strong>Activity Stats:</strong>
            Transactions: {persona.stats.transactions}, Assets: {persona.stats.assets}, Networks: {persona.stats.networks}
          </div>
          <div className="mb-2 flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary-400" />
            <strong>First Transaction:</strong> {persona.firstTransaction}
          </div>
        </div>
      )}

      {/* AI-generated Wallet Social Handle/Bio */}
      {persona && address && (
        <WalletAIBio
          address={address}
          personaTitle={persona.title}
          {...generateWalletAIBio(address, persona.title)}
        />
      )}
    </div>
  );
};

export default PersonaPage;