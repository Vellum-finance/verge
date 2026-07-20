import {
  CREATOR_FEE,
  PROTOCOL_FEE,
  INITIAL_SUPPLY,
  VIRTUAL_ETH,
  VIRTUAL_TOKEN,
} from "./constants";

import {
  PoolState,
  TradeResult,
  SellResult,
} from "./types";

import {
  calculateLiquidity,
  calculateMarketCap,
  calculatePrice,
} from "./pricing";

export function createPool(): PoolState {
  return {
    reserveETH: VIRTUAL_ETH,

    reserveToken: VIRTUAL_TOKEN,
  };
}

function invariant(pool: PoolState) {
  return pool.reserveETH * pool.reserveToken;
}

export function getPrice(pool: PoolState) {
  return calculatePrice(
    pool.reserveETH,
    pool.reserveToken
  );
}

export function getMarketCap(pool: PoolState) {
  return calculateMarketCap(
    getPrice(pool),
    INITIAL_SUPPLY
  );
}

export function getLiquidity(pool: PoolState) {
  return calculateLiquidity(
    pool.reserveETH,
    getPrice(pool)
  );
}

export function buy(
  pool: PoolState,
  ethIn: number
): TradeResult {

  const fee = ethIn * (CREATOR_FEE + PROTOCOL_FEE);

  const effectiveETH = ethIn - fee;

  const k = invariant(pool);

  const newReserveETH =
    pool.reserveETH + effectiveETH;

  const newReserveToken =
    k / newReserveETH;

  const receivedTokens =
    pool.reserveToken - newReserveToken;

  const nextPool: PoolState = {
    reserveETH: newReserveETH,

    reserveToken: newReserveToken,
  };

  return {
    pool: nextPool,

    price: getPrice(nextPool),

    marketCap: getMarketCap(nextPool),

    liquidity: getLiquidity(nextPool),

    feePaid: fee,

    receivedTokens,

    spentETH: ethIn,
  };
}

export function sell(
  pool: PoolState,
  tokenIn: number
): SellResult {

  const k = invariant(pool);

  const newReserveToken =
    pool.reserveToken + tokenIn;

  const newReserveETH =
    k / newReserveToken;

  const ethOut =
    pool.reserveETH - newReserveETH;

  const fee =
    ethOut * (CREATOR_FEE + PROTOCOL_FEE);

  const receivedETH =
    ethOut - fee;

  const nextPool: PoolState = {
    reserveETH: newReserveETH,

    reserveToken: newReserveToken,
  };

  return {
    pool: nextPool,

    price: getPrice(nextPool),

    marketCap: getMarketCap(nextPool),

    liquidity: getLiquidity(nextPool),

    feePaid: fee,

    receivedETH,

    soldTokens: tokenIn,
  };
}