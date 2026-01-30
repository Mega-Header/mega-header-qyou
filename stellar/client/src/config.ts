import 'dotenv/config';

export type NetworkType = 'TESTNET' | 'MAINNET';

interface StellarConfig {
  network: NetworkType;
  horizonUrl: string;
  isProduction: boolean;
}

const networkEnv = (
  process.env.STELLAR_NETWORK || 'TESTNET'
).toUpperCase() as NetworkType;

const CONFIG_MAP: Record<NetworkType, StellarConfig> = {
  TESTNET: {
    network: 'TESTNET',
    horizonUrl: 'https://horizon-testnet.stellar.org',
    isProduction: false,
  },
  MAINNET: {
    network: 'MAINNET',
    horizonUrl: 'https://horizon.stellar.org',
    isProduction: true,
  },
};

export const STELLAR_CONFIG = CONFIG_MAP[networkEnv] || CONFIG_MAP.TESTNET;

if (STELLAR_CONFIG.isProduction) {
  console.warn('⚠️  WARNING: mega-header-mega-header-qyou is running on STELLAR MAINNET (Real Money)');
} else {
  console.log('🧪 mega-header-mega-header-qyou Stellar running on TESTNET');
}
