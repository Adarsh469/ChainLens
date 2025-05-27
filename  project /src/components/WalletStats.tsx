import { useEffect, useState } from 'react';
import { Coins, BarChart3, Wallet, Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getWalletData } from '../utils/walletUtils'; // Import your wallet utilities

interface WalletStatsProps {
  address: string;
}

interface Stats {
  totalTransactions: number;
  totalAssets: number;
  firstTransaction: string;
  networksUsed: number;
}

const WalletStats = ({ address }: WalletStatsProps) => {
  const [stats, setStats] = useState<Stats>({
    totalTransactions: 0,
    totalAssets: 0,
    firstTransaction: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    }),
    networksUsed: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch wallet data when address changes
  useEffect(() => {
    const fetchWalletData = async () => {
      if (!address) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const walletData = await getWalletData(address);
        
        setStats({
          totalTransactions: walletData.transactionCount,
          totalAssets: walletData.assetCount,
          firstTransaction: walletData.firstTransaction,
          networksUsed: walletData.networks,
        });
      } catch (err) {
        console.error('Error fetching wallet stats:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch wallet data');
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [address]); // Re-run when address changes

  const statItems = [
    {
      name: 'Transactions',
      value: loading ? '...' : stats.totalTransactions.toLocaleString(),
      icon: <BarChart3 className="h-5 w-5 text-primary-400" />,
      delay: 0.1,
    },
    {
      name: 'Assets',
      value: loading ? '...' : stats.totalAssets.toLocaleString(),
      icon: <Coins className="h-5 w-5 text-secondary-400" />,
      delay: 0.2,
    },
    {
      name: 'First Activity',
      value: loading ? '...' : stats.firstTransaction,
      icon: <Wallet className="h-5 w-5 text-accent-400" />,
      delay: 0.3,
    },
    {
      name: 'Networks',
      value: loading ? '...' : stats.networksUsed.toString(),
      icon: <Globe2 className="h-5 w-5 text-success-400" />,
      delay: 0.4,
    },
  ];

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-full card">
          <p className="text-red-400">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <motion.div
          key={index}
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: item.delay }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-2">
              <div className="mr-3">{item.icon}</div>
              <h3 className="text-sm font-medium text-gray-400">{item.name}</h3>
            </div>
            <div className="mt-auto">
              <p className="text-2xl font-semibold">{item.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default WalletStats;