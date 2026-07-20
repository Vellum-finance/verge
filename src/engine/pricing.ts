import { PRICE_DECIMALS } from "./constants";

export function calculatePrice(
  reserveETH: number,
  reserveToken: number
) {
  if (reserveToken <= 0) return 0;

  return Number(
    (reserveETH / reserveToken).toFixed(
      PRICE_DECIMALS
    )
  );
}

export function calculateMarketCap(
  price: number,
  supply: number
) {
  return price * supply;
}

export function calculateLiquidity(
  reserveETH: number,
  price: number
) {
  return reserveETH * price;
}