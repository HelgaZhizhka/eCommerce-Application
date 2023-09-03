import { makeAutoObservable, runInAction, reaction, toJS } from 'mobx';
import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';

import { customerLogin, customerSignUp } from '../services/authService';
import { RegistrationFormValuesData } from '../components/RegistrationForm/Registration.interface';
import { setAdress, getUser } from '../services/setCustomersDetails';

type UserStoreType = {
  userData: Record<string, string | number | boolean>;
  loggedIn: boolean;
  isRegistration: boolean;
  isEditMode: boolean;
  error: null | string;
  userProfile: Customer | null;
  login: (email: string, password: string) => Promise<void>;
  signup: () => Promise<void>;
  logout: () => void;
  updateUserData: (data: object) => void;
  clearError: () => void;
  resetRegistration: () => void;
  setEditMode: (isEditMode: boolean) => void;
  saveUserData: (data: object) => void;
  getUserProfile: () => Promise<void>;
};

const createUserStore = (): UserStoreType => {
  const store = {
    userData: {},
    userProfile: {} as Customer,
    isEditMode: true,
    loggedIn: localStorage.getItem('loggedIn') === 'true',
    isRegistration: false,
    error: null as null | string,

    async login(email: string, password: string): Promise<void> {
      try {
        // const {response, token} = await customerLogin(email, password);
        // const res = await response;
        const res = await customerLogin(email, password);
        // console.log(token);

        // localStorage.setItem('token', token);
        runInAction(() => {
          store.error = null;

          if (res.statusCode === 200) {
            store.loggedIn = true;
            store.userProfile = {
              ...res.body.customer,
            };
          }

          if (res.statusCode === 400) {
            throw new Error('Unexpected error');
          }
        });
      } catch (err) {
        runInAction(() => {
          store.error = 'Customer account with the given credentials not found';
        });
      }
    },

    async signup(): Promise<void> {
      try {
        const data: Partial<RegistrationFormValuesData> = toJS(store.userData);
        const response = await customerSignUp(data);

        runInAction(() => {
          store.error = null;
          if (response.statusCode === 201) {
            store.loggedIn = true;
            if (data.email && data.password) {
              setAdress(data.email, data.password);
            }

            store.isRegistration = true;
          }
          if (response.statusCode === 400) {
            throw new Error('Unexpected error');
          }
        });
      } catch (err) {
        runInAction(() => {
          store.error = 'There is already an existing customer with the provided email.';
        });
      }
    },

    resetRegistration(): void {
      store.isRegistration = false;
    },

    clearError(): void {
      store.error = null;
    },

    updateUserData(data: Partial<RegistrationFormValuesData>): void {
      store.userData = { ...store.userData, ...data };
    },

    logout(): void {
      localStorage.removeItem('loggedIn');
      store.loggedIn = false;
      store.userData = {};
      store.error = null;
      store.userProfile = {} as Customer;
    },

    setEditMode(isEditMode: boolean): void {
      store.isEditMode = isEditMode;
    },

    saveUserData(data: object): void {
      store.userData = { ...store.userData, ...data };
    },

    async getUserProfile(): Promise<void> {
      const userProfile = await getUser();

      if (!userProfile) return;
      runInAction(() => {
        store.userProfile = {
          ...userProfile,
        };
      });
    },
  };

  makeAutoObservable(store);

  reaction(
    () => store.loggedIn,
    (loggedIn) => {
      localStorage.setItem('loggedIn', String(loggedIn));
    }
  );

  return store;
};

export const userStore = createUserStore();
