import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { Customer } from '@commercetools/platform-sdk';
import { ClientResponse } from '@commercetools/platform-sdk';

import { customerLogin, customerSignUp } from '../services/authService';
import { RegistrationFormValuesData } from '../components/RegistrationForm/Registration.interface';
import {
  setAdress,
  getUser,
  removeAddress,
  changeAddress,
  addAddress,
  updatePersonalData,
  changePassword,
} from '../services/setCustomersDetails';
import { clearSession, isCustomerSession } from '../services/session';
import { cartStore } from './CartStore';

type UserStoreType = {
  userData: Record<string, string | number | boolean>;
  loggedIn: boolean;
  isRegistration: boolean;
  isEditMode: boolean;
  error: null | string;
  success: null | string;
  userProfile: Customer | null;
  login: (email: string, password: string) => Promise<void>;
  signup: () => Promise<void>;
  logout: () => void;
  updateUserData: (data: object) => void;
  clearError: () => void;
  clearSuccess: () => void;
  resetRegistration: () => void;
  setEditMode: (isEditMode: boolean) => void;
  getUserProfile: () => Promise<void>;
  updateUserProfile: (data: Record<string, string | boolean | number>) => Promise<void>;
};

const createUserStore = (): UserStoreType => {
  const store = {
    userData: {},
    userProfile: {} as Customer,
    isEditMode: false,
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
            store.userProfile = {
              ...res.body.customer,
            };
            cartStore.initCart();
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
      localStorage.removeItem('cart');
      localStorage.removeItem('cartId');
      localStorage.removeItem('cartVersion');
      clearSession();
      store.loggedIn = false;
      store.userData = {};
      store.clearError();
      store.userProfile = {} as Customer;
      cartStore.resetCart();
    },

    setEditMode(isEditMode: boolean): void {
      store.isEditMode = isEditMode;
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

    async updateUserProfile(data: Record<string, string | boolean | number>): Promise<void> {
      const { action } = data;

      let response: ClientResponse<Customer>;
      let body: Customer = store.userProfile;

      const { id } = data;
      const currentData = { ...data, version: store.userProfile.version };

      if (action === 'removeAddress') {
        try {
          response = await removeAddress(currentData);
          body = response.body;

          runInAction(() => {
            store.clearSuccess();
            if (response.statusCode === 200) {
              body = response.body;
              runInAction(() => {
                store.success = 'Address removed successfully';
              });
            }
            if (response.statusCode === 400) {
              throw new Error('Error occurred while removing an address.');
            }
          });
        } catch (err) {
          runInAction(() => {
            store.clearError();
            store.error = 'Error occurred while removing an address.';
          });
        }
      }

      if (action === 'changeAddress') {
        const currentAddress = store.userProfile.addresses.filter((item) => item.id === id)[0] as unknown as Record<
          string,
          string | boolean | number
        >;

        try {
          response = await changeAddress({ ...currentAddress, ...currentData });
          body = response.body;

          runInAction(() => {
            store.clearSuccess();
            if (response.statusCode === 200) {
              body = response.body;
              runInAction(() => {
                store.success = 'Address changed successfully';
              });
            }
            if (response.statusCode === 400) {
              throw new Error('Error occurred while editing an address.');
            }
          });
        } catch (err) {
          runInAction(() => {
            store.clearError();
            store.error = 'Error occurred while editing an address.';
          });
        }
      }

      if (action === 'addAddress') {
        try {
          response = await addAddress(currentData);
          body = response.body;

          runInAction(() => {
            store.clearSuccess();
            if (response.statusCode === 200) {
              body = response.body;
              runInAction(() => {
                store.success = 'Address added successfully';
              });
            }
            if (response.statusCode === 400) {
              throw new Error('Error occurred while adding an address.');
            }
          });
        } catch (err) {
          runInAction(() => {
            store.clearError();
            store.error = 'Error occurred while adding an address.';
          });
        }
      }

      if (action === 'changePersonalData') {
        try {
          response = await updatePersonalData(currentData);
          body = response.body;

          runInAction(() => {
            store.clearSuccess();
            if (response.statusCode === 200) {
              body = response.body;
              runInAction(() => {
                store.success = 'Your personal data changed successfully';
              });
            }
            if (response.statusCode === 400) {
              throw new Error('The email format invalid.');
            }
          });
        } catch (err) {
          runInAction(() => {
            store.clearError();
            store.error = 'The email format invalid';
          });
        }
      }

      if (action === 'changePassword') {
        try {
          response = await changePassword(currentData);

          runInAction(() => {
            store.clearSuccess();
            if (response.statusCode === 200) {
              body = response.body;
              runInAction(() => {
                store.success = 'Password changed successfully';
              });
            }
            if (response.statusCode === 400) {
              throw new Error('The given current password does not match.');
            }
          });
        } catch (err) {
          runInAction(() => {
            store.clearError();
            store.error = 'The given current password does not match';
          });
        }
      }

      runInAction(() => {
        store.userProfile = {
          ...body,
        };
      });
    },
  };

  makeAutoObservable(store);

  return store;
};

export const userStore = createUserStore();
