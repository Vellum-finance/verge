export type WalletUser = {
  id: string;
  wallet: string;
};

export async function login() {
  throw new Error("login() not implemented");
}

export async function logout() {
  throw new Error("logout() not implemented");
}

export async function getCurrentUser(): Promise<WalletUser | null> {
  return null;
}