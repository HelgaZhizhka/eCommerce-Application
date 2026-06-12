import { makeAutoObservable, runInAction, toJS } from 'mobx';

import { customerLogin, customerSignUp } from '../services/authService';
import { RegistrationFormValuesData } from '../components/RegistrationForm/Registration.interface';
import { setAdress } from '../services/setCustomersDetails';
import { clearSession, isCustomerSession } from '../services/session';
import { queryClient } from '../queries/queryClient';
import { cartKey } from '../queries/cart';
import { meKey } from '../queries/customer';

type UserStoreType = {
  userData: Record<string, string | number | boolean>;
  loggedIn: boolean;
  isRegistration: boolean;
  error: null | string;
  success: null | string;
  login: (email: string, password: string) => Promise<void>;
  signup: () => Promise<void>;
  logout: () => void;
  updateUserData: (data: object) => void;
  clearError: () => void;
  clearSuccess: () => void;
  resetRegistration: () => void;
};

const createUserStore = (): UserStoreType => {
  const store = {
    userData: {},
    // session validity is the source of truth (2.5) — no separate flag
    loggedIn: isCustomerSession(),
    isRegistration: false,
    error: null as null | string,
    success: null as null | string,

    async login(email: string, password: string): Promise<void> {
      try {
        const res = await customerLogin(email, password);

        runInAction(() => {
          if (res.statusCode === 200) {
            store.loggedIn = true;
            queryClient.setQueryData(meKey, res.body.customer);
            queryClient.invalidateQueries({ queryKey: cartKey });
          }

          if (res.statusCode === 400) {
            throw new Error('Unexpected error');
          }
        });
      } catch (err) {
        runInAction(() => {
          store.clearError();
          store.error = 'Customer account with the given credentials not found. Log in or use another email address';
        });
      }
    },

    async signup(): Promise<void> {
      try {
        const data: Partial<RegistrationFormValuesData> = toJS(store.userData);
        const response = await customerSignUp(data);

        if (response.statusCode === 201 && data.email && data.password) {
          // must complete before success is reported: fire-and-forget here lost
          // the shipping/billing address links when the tab closed early
          await setAdress(data.email, data.password);
        }

        runInAction(() => {
          if (response.statusCode === 201) {
            store.loggedIn = true;
            store.isRegistration = true;
          }
          if (response.statusCode === 400) {
            throw new Error('Unexpected error');
          }
        });
      } catch (err) {
        runInAction(() => {
          store.clearError();
          store.error =
            'There is already an existing customer with the provided email. Log in or use another email address';
        });
      }
    },

    resetRegistration(): void {
      store.isRegistration = false;
    },

    clearError(): void {
      store.error = null;
    },

    clearSuccess(): void {
      store.success = null;
    },

    updateUserData(data: Partial<RegistrationFormValuesData>): void {
      store.userData = { ...store.userData, ...data };
    },

    logout(): void {
      clearSession();
      queryClient.setQueryData(cartKey, null);
      queryClient.setQueryData(meKey, null);
      store.loggedIn = false;
      store.userData = {};
      store.clearError();
    },
  };

  makeAutoObservable(store);

  return store;
};

export const userStore = createUserStore();
