import { create } from 'zustand';

import { customerLogin, customerSignUp } from '../services/authService';
import { RegistrationFormValuesData } from '../components/RegistrationForm/Registration.interface';
import { setAdress } from '../services/setCustomersDetails';
import { clearSession, isCustomerSession } from '../services/session';
import { queryClient } from '../queries/queryClient';
import { cartKey } from '../queries/cart';
import { meKey } from '../queries/customer';

// The thin client-side auth/registration state that survived phase 3.
// userData (the registration wizard accumulator) dies in phase 4.

type AuthState = {
  loggedIn: boolean;
  isRegistration: boolean;
  userData: Record<string, string | number | boolean>;
  error: string | null;
  success: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: () => Promise<void>;
  logout: () => void;
  updateUserData: (data: Partial<RegistrationFormValuesData>) => void;
  resetRegistration: () => void;
  clearError: () => void;
  clearSuccess: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  // session validity is the source of truth (2.5) — no separate flag
  loggedIn: isCustomerSession(),
  isRegistration: false,
  userData: {},
  error: null,
  success: null,

  login: async (email, password) => {
    try {
      const res = await customerLogin(email, password);

      if (res.statusCode === 200) {
        queryClient.setQueryData(meKey, res.body.customer);
        queryClient.invalidateQueries({ queryKey: cartKey });
        set({ loggedIn: true });
      }

      if (res.statusCode === 400) {
        throw new Error('Unexpected error');
      }
    } catch {
      set({ error: 'Customer account with the given credentials not found. Log in or use another email address' });
    }
  },

  signup: async () => {
    try {
      const data: Partial<RegistrationFormValuesData> = get().userData;
      const response = await customerSignUp(data);

      if (response.statusCode === 201 && data.email && data.password) {
        // must complete before success is reported: fire-and-forget here lost
        // the shipping/billing address links when the tab closed early
        await setAdress(data.email, data.password);
      }

      if (response.statusCode === 201) {
        set({ loggedIn: true, isRegistration: true });
      }

      if (response.statusCode === 400) {
        throw new Error('Unexpected error');
      }
    } catch {
      set({
        error: 'There is already an existing customer with the provided email. Log in or use another email address',
      });
    }
  },

  logout: () => {
    clearSession();
    queryClient.setQueryData(cartKey, null);
    queryClient.setQueryData(meKey, null);
    set({ loggedIn: false, userData: {}, error: null });
  },

  updateUserData: (data) => set((state) => ({ userData: { ...state.userData, ...data } })),
  resetRegistration: () => set({ isRegistration: false }),
  clearError: () => set({ error: null }),
  clearSuccess: () => set({ success: null }),
}));
