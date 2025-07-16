import { create } from 'zustand';
import type { User } from '@/types/user';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    clearUser: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
    user: null,
    isAuthenticated: false,

    setUser: (user) => set({ user, isAuthenticated: true }),

    clearUser: () => set({ user: null, isAuthenticated: false }),

    logout: () => set({ user: null, isAuthenticated: false }),
}));