import {
  createPool,
  buy,
  sell,
  getPrice,
  getMarketCap,
  getLiquidity,
} from "./bondingCurve";

import { PoolState } from "./types";

export class TokenMarket {

  private pool: PoolState;

  public holders = 1;

  public volume = 0;

  public transactions = 0;

  constructor() {
    this.pool = createPool();
  }

  get state() {
    return {
      reserveETH: this.pool.reserveETH,

      reserveToken: this.pool.reserveToken,

      price: getPrice(this.pool),

      marketCap: getMarketCap(this.pool),

      liquidity: getLiquidity(this.pool),

      holders: this.holders,

      volume: this.volume,

      transactions: this.transactions,
    };
  }

  buy(eth: number) {

    const result = buy(this.pool, eth);

    this.pool = result.pool;

    this.volume += eth;

    this.transactions++;

    return result;
  }

  sell(tokens: number) {

    const result = sell(this.pool, tokens);

    this.pool = result.pool;

    this.volume += result.receivedETH;

    this.transactions++;

    return result;
  }

}