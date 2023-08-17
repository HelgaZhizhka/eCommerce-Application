import { makeAutoObservable, runInAction, reaction } from 'mobx';
import { customerLogin } from '../services/authService';

type UserStoreType = {
  userData: UserData;
  loggedIn: boolean;
  error: null | string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
};

interface UserData {
  firstName: string;
  lastName: string;
} // info about user (probably info from userdraft?)

const createUserStore = (): UserStoreType => {
  const store = {
    userData: {
      firstName: '',
      lastName: '',
    },
    loggedIn: localStorage.getItem('loggedIn') === 'true',
    error: null as null | string,

    async login(email: string, password: string): Promise<void> {
      try {
        const response = await customerLogin(email, password);
        runInAction(() => {
          store.error = null;
          if (response.statusCode === 200) {
            if (response.body.customer.firstName && response.body.customer.lastName) {
              store.userData.firstName = response.body.customer.firstName;
              store.userData.lastName = response.body.customer.lastName;
            }
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

    clearError(): void {
      store.error = null;
    },

    logout(): void {
      localStorage.removeItem('loggedIn');
      store.loggedIn = false;
      store.userData = {
        firstName: '',
        lastName: '',
      }; // проверить что приходит в userdata
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
