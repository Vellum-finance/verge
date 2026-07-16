export type Token = {
  name: string;
  ticker: string;
  description: string;
  logo?: string;
  createdAt: number;
};


const KEY = "verge_tokens";


export function getTokens(): Token[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(KEY);

  return data ? JSON.parse(data) : [];
}


export function saveToken(token: Token) {
  const tokens = getTokens();

  localStorage.setItem(
    KEY,
    JSON.stringify([
      token,
      ...tokens,
    ])
  );
}
