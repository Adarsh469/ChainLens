export interface WalletTrait {
  name: string;
  level: number; // 0-100
}

export interface WalletStats {
  transactions: number;
  assets: number;
  networks: number;
}

export interface WalletPersona {
  title: string;
  description: string;
  primaryTrait: string;
  traits: WalletTrait[];
  firstTransaction: string;
  stats: WalletStats;
}

export interface TransactionActivity {
  period: string;
  count: number;
}