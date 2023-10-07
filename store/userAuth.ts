import { create } from "zustand";
type TokenStore = {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
};
export const useTokenStore = create<TokenStore>((set) => ({
  token:
    typeof window !== "undefined" ? localStorage?.getItem("token") || "" : "",
  setToken: (token: string) =>
    set(() => {
      localStorage.setItem("token", token);
      return { token };
    }),
  clearToken: () =>
    set(() => {
      localStorage.removeItem("token");
      return { token: "" };
    }),
}));
type User = { id: string; name: string; email: string };
type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User) => set(() => ({ user })),
  clearUser: () => set(() => ({ user: null })),
}));
