import { makeAutoObservable, runInAction } from 'mobx';
import { customerLogin } from '../services/authService';

interface UserData {
  firstName: string,
  lastName: string
}

class UserStore {
  public userData: UserData = {
    firstName: '',
    lastName: ''
  }; // info about user (probably info from userdraft?)

  public loggedIn = false;

  public error: null | string = null;

  constructor() {
    makeAutoObservable(this);  // component to observe data from mobx
  }

  public async login(email: string, password: string): Promise<void> {
    try {
      const response = await customerLogin(email, password);
      runInAction(() => {
        this.error = null;
        if (response.statusCode === 200) {
          if (response.body.customer.firstName && response.body.customer.lastName) {
            this.userData.firstName = response.body.customer.firstName;
            this.userData.lastName = response.body.customer.lastName;
          }

          this.loggedIn = true;
          console.log('this.userData', this.userData)
        }
        if (response.statusCode === 400) {
          console.log('this.error', this.error)
          throw new Error('Unexpected error');
        }
      })
    } catch (err) {
      runInAction(() => {
        this.error = 'Customer account with the given credentials not found'
      })
    }
  }

  public logout(): void {
    this.loggedIn = false;
    this.userData = {
      firstName: '',
      lastName: ''
    };  // проверить что приходит в userdata
    this.error = null;
  }
}

export const userStore = new UserStore();
