import { makeAutoObservable, runInAction, reaction, toJS } from 'mobx';
import { customerLogin, customerSignUp } from '../services/authService';
import { RegistrationFormValuesData } from '../components/RegistrationForm/Registration.interface';
import setAdress from '../services/setCustomersDetails';

type UserStoreType = {
  userData: Record<string, string | number | boolean>;
  loggedIn: boolean;
  error: null | string;
  login: (email: string, password: string) => Promise<void>;
  signup: () => Promise<void>;
  logout: () => void;
  updateUserData: (data: object) => void;
  clearError: () => void;
};

const createUserStore = (): UserStoreType => {
  const store = {
    userData: {},
    loggedIn: localStorage.getItem('loggedIn') === 'true',
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

    clearError(): void {
      store.error = null;
    },

    updateUserData(data: Partial<RegistrationFormValuesData>): void {
          store.userData = { ...store.userData, ...data };
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

  return store;
};

export const userStore = createUserStore();
