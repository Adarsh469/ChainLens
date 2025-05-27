/**
 * @file walletUtils.ts
 * @description Utility functions for wallet data and analysis
 * @author Adarsh469
 * @lastModified 2025-05-27 16:10:00 UTC
 */

import { ethers } from 'ethers';
import { WalletPersona } from '../types/wallet';
import { ActivityData } from '../types/activity';

// Enhanced RPC endpoints for Ethereum mainnet
const RPC_ENDPOINTS = [
  'https://ethereum-rpc.publicnode.com',
  'https://rpc.ankr.com/eth',
  'https://eth.llamarpc.com',
  'https://ethereum.gateway.tenderly.co',
  'https://eth-mainnet.g.alchemy.com/v2/demo',
  'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
];

let currentProviderIndex = 0;
let provider = new ethers.JsonRpcProvider(RPC_ENDPOINTS[currentProviderIndex]);

const getWorkingProvider = async () => {
  let attempts = 0;
  const maxAttempts = RPC_ENDPOINTS.length;
  while (attempts < maxAttempts) {
    try {
      provider = new ethers.JsonRpcProvider(RPC_ENDPOINTS[currentProviderIndex]);
      await provider.getBlockNumber();
      return provider;
    } catch (error) {
      currentProviderIndex = (currentProviderIndex + 1) % RPC_ENDPOINTS.length;
      attempts++;
    }
  }
  throw new Error('All Ethereum RPC endpoints failed.');
};

export const truncateAddress = (address: string): string => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const isValidAddress = (address: string): boolean => {
  try {
    return ethers.isAddress(address);
  } catch {
    return false;
  }
};

export interface WalletTrait {
  name: string;
  level: number;
}

const calculateTraitLevels = (txCount: number, balance: string): WalletTrait[] => {
  const traits = [];

  const traderLevel = Math.min(Math.floor((txCount / 50) * 100), 100);
  traits.push({ name: 'Trader', level: traderLevel });

  const balanceEth = parseFloat(balance);
  const holderLevel = Math.min(Math.floor((balanceEth / 1) * 100), 100);
  traits.push({ name: 'Holder', level: holderLevel });

  const activityLevel = Math.min(Math.floor((txCount / 20) * 100), 100);
  traits.push({ name: 'Active User', level: activityLevel });

  return traits;
};

const determinePersonaType = (traits: WalletTrait[]): string => {
  const sortedTraits = [...traits].sort((a, b) => b.level - a.level);
  return sortedTraits[0].name;
};

export const getTransactionActivity = async (address: string): Promise<ActivityData> => {
  const workingProvider = await getWorkingProvider();
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  try {
    const latestBlock = await workingProvider.getBlockNumber();
    const blocksPerMonth = 2628000; // ~30.5 days worth of blocks (12s per block)

    const values = await Promise.all(
      Array.from({ length: 12 }, async (_, i) => {
        const endBlock = latestBlock - (i * blocksPerMonth);
        const startBlock = endBlock - blocksPerMonth;
        try {
          const txCount = await workingProvider.getTransactionCount(address, endBlock);
          const prevTxCount = await workingProvider.getTransactionCount(address, startBlock);
          return Math.max(0, txCount - prevTxCount);
        } catch (error) {
          console.warn(`Error fetching transaction count for month ${i}:`, error);
          return 0;
        }
      }).reverse()
    );

    return {
      labels: [...months],
      values: values
    };
  } catch (error) {
    console.error('Error fetching transaction activity:', error);
    throw error;
  }
};

// --- FIXED: Accurate First Transaction Date ---
export const getFirstTransactionDate = async (address: string): Promise<string> => {
  const provider = await getWorkingProvider();
  const latest = await provider.getBlockNumber();
  let low = 0;
  let high = latest;
  let firstTxBlock: number | null = null;

  // Binary search for the first block with a transaction
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    try {
      const count = await provider.getTransactionCount(address, mid);
      if (count > 0) {
        firstTxBlock = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    } catch {
      break;
    }
  }

  if (firstTxBlock !== null) {
    const block = await provider.getBlock(firstTxBlock);
    if (block && block.timestamp) {
      return new Date(block.timestamp * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  }
  return 'Unknown';
};

export const getWalletData = async (address: string) => {
  if (!isValidAddress(address)) {
    throw new Error('Invalid Ethereum address format');
  }

  try {
    const workingProvider = await getWorkingProvider();

    const timeout = 10000;
    const [txCount, balance] = await Promise.race([
      Promise.all([
        workingProvider.getTransactionCount(address),
        workingProvider.getBalance(address)
      ]),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), timeout)
      )
    ]) as [number, bigint];

    // FIX: Use actual first transaction date!
    const firstTransactionDate = await getFirstTransactionDate(address);

    return {
      transactionCount: txCount,
      firstTransaction: firstTransactionDate,
      assetCount: txCount > 0 ? Math.floor(Math.max(1, txCount / 5)) : 0,
      balance: ethers.formatEther(balance),
      networks: 1,
    };

  } catch (error) {
    console.error('Error fetching wallet data:', error);
    throw error;
  }
};

export const generateWalletPersona = async (address: string): Promise<WalletPersona> => {
  const walletData = await getWalletData(address);

  const traits = calculateTraitLevels(walletData.transactionCount, walletData.balance);
  const primaryTrait = determinePersonaType(traits);

  let title = 'New Explorer';
  let description = 'A newcomer to Web3, taking their first steps into blockchain technology.';

  if (walletData.transactionCount > 50) {
    title = 'Active Trader';
    description = 'A frequent participant in blockchain transactions with significant activity.';
  } else if (walletData.transactionCount > 20) {
    title = 'Regular User';
    description = 'An established Web3 user with consistent blockchain activity.';
  } else if (walletData.transactionCount > 5) {
    title = 'Casual Participant';
    description = 'Beginning to explore Web3 with growing engagement in blockchain activities.';
  }

  return {
    title,
    description,
    primaryTrait,
    traits,
    firstTransaction: walletData.firstTransaction,
    stats: {
      transactions: walletData.transactionCount,
      assets: walletData.assetCount,
      networks: walletData.networks,
    },
  };
};

/* --- WALLET HEALTH/RISK SCORE --- */
export const getWalletRiskScore = async (address: string): Promise<number> => {
  const data = await getWalletData(address);
  let score = 100;
  if (data.transactionCount < 3) score -= 30;
  if (data.assetCount < 2) score -= 20;
  return Math.max(0, Math.min(100, score));
};

/* --- RECOMMENDATIONS --- */
export const getRecommendations = (persona: WalletPersona): string[] => {
  if (!persona) return [];
  if (persona.primaryTrait === 'Trader') return ['Uniswap', 'Aave', 'dYdX'];
  if (persona.primaryTrait === 'Holder') return ['Zapper', 'Argent Wallet'];
  if (persona.primaryTrait === 'Active User') return ['Snapshot', 'Gitcoin'];
  return ['OpenSea', 'ENS'];
};

/* --- AI-generated Wallet Bio/Social Handle --- */
export const generateWalletAIBio = (address: string, personaTitle: string): { handle: string, bio: string } => {
  // Shorten address for handle uniqueness
  const short = address ? address.substring(2, 6) : "user";
  // Pick a prefix or emoji based on persona
  let style = "";
  let emoji = "👤";
  switch (personaTitle) {
    case "Active Trader": style = "Rocket"; emoji = "🚀"; break;
    case "Trader": style = "Trader"; emoji = "💹"; break;
    case "Holder": style = "Holder"; emoji = "🪙"; break;
    case "Active User": style = "Active"; emoji = "⚡"; break;
    case "Casual Participant": style = "Sprout"; emoji = "🌱"; break;
    case "Regular User": style = "Chainer"; emoji = "🔗"; break;
    default: style = "Explorer"; emoji = "🧭";
  }
  // Handle and fun bio
  const handle = `@${style}_${short}`;
  const bio = `${emoji} ${style} making moves on-chain. Follow for alpha & vibes!`;
  return { handle, bio };
};