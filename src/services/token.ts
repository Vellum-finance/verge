import { supabase } from "../lib/supabase";

import {
  INITIAL_SUPPLY,
} from "../engine/constants";

import {
  createPool,
  getPrice,
  getMarketCap,
  getLiquidity,
} from "../engine/bondingCurve";

type CreateTokenInput = {
  creator_wallet: string;
  name: string;
  symbol: string;
  description?: string;
  logo_url?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
};

export async function createToken(data: CreateTokenInput) {

  const pool = createPool();

  const currentPrice = getPrice(pool);

  const marketCap = getMarketCap(pool);

  const liquidity = getLiquidity(pool);

  const { data: result, error } = await supabase
    .from("tokens")
    .insert([
      {
        creator_wallet: data.creator_wallet,

        name: data.name,

        symbol: data.symbol,

        description: data.description,

        logo_url: data.logo_url,

        website: data.website,

        twitter: data.twitter,

        telegram: data.telegram,

        supply: INITIAL_SUPPLY,

        reserve_eth: pool.reserveETH,

        reserve_token: pool.reserveToken,

        current_price: currentPrice,

        market_cap: marketCap,

        liquidity: liquidity,

        volume: 0,

        holders: 1,

        transactions: 0,

        graduated: false,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return result;
}