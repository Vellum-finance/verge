export interface PoolState {
  reserveETH: number;

  reserveToken: number;
}

export interface TokenState {
  id: string;

  name: string;

  symbol: string;

  supply: number;

  price: number;

  marketCap: number;

  liquidity: number;

  volume: number;

  holders: number;

  transactions: number;

  reserveETH: number;

  reserveToken: number;

  graduated: boolean;
}

export interface TradeResult {
  pool: PoolState;

  price: number;

  marketCap: number;

  liquidity: number;

  feePaid: number;

  receivedTokens: number;

  spentETH: number;
}

export interface SellResult {
  pool: PoolState;

  price: number;

  marketCap: number;

  liquidity: number;

  feePaid: number;

  receivedETH: number;

  soldTokens: number;
}