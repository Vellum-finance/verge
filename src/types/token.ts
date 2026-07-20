export interface Token {
  id: string;

  creator_wallet: string;

  name: string;

  symbol: string;

  description: string | null;

  logo_url: string | null;

  website: string | null;

  twitter: string | null;

  telegram: string | null;

  created_at: string;

  supply: number;

  reserve_eth: number;

  reserve_token: number;

  current_price: number;

  market_cap: number;

  liquidity: number;

  volume: number;

  holders: number;

  transactions: number;

  graduated: boolean;
}