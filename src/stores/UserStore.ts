import { makeAutoObservable, runInAction, reaction, toJS } from 'mobx';
import { customerLogin, customerSignUp } from '../services/authService';
import { RegistrationFormValuesData } from '../components/RegistrationForm/Registration.interface';
import setAdress from '../services/setCustomersDetails';

type UserStoreType = {
  userData: Record<string, string | number | boolean>;
  loggedIn: boolean;
  isRegistration: boolean;
  error: null | string;
  login: (email: string, password: string) => Promise<void>;
  signup: () => Promise<void>;
  logout: () => void;
  updateUserData: (data: object) => void;
  clearError: () => void;
  resetRegistration: () => void;
  getUserData: () => Record<string, string | number | boolean>;
};

const createUserStore = (): UserStoreType => {
  const store = {
    userData: {},
    loggedIn: localStorage.getItem('loggedIn') === 'true',
    isRegistration: false,
    error: null as null | string,

    async login(email: string, password: string): Promise<void> {
      try {
        const response = await customerLogin(email, password);
        runInAction(() => {
          store.error = null;
          if (response.statusCode === 200) {
            store.loggedIn = true;
          }
          if (response.statusCode === 400) {
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
              setAdress(data.email, data.password)
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

    getUserData():Record<string, string | number | boolean> {
      const data: Partial<RegistrationFormValuesData> = toJS(store.userData);
      return data
    },

    

    logout(): void {
      localStorage.removeItem('loggedIn');
      store.loggedIn = false;
      store.userData = {}; // проверить что приходит в userdata
      store.error = null;
    },
  };

  makeAutoObservable(store); // component to observe data from mobx

  reaction(
    () => store.loggedIn,
    (loggedIn) => {
      localStorage.setItem('loggedIn', String(loggedIn));
    }
  );

  reaction(
    () => store.userData,
    (userData) => {
      store.getUserData();
    }
  );

  return store;
};

export const userStore = createUserStore();
