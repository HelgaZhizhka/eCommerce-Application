import { makeAutoObservable, runInAction } from 'mobx';
// import { customerLogin } from '../services/CustomerService'; //! запросы

class UserStore {
  private userData = {}; // info about user: login, password (probably info from userdraft?)

  public loggedIn = false;

  public error: null | string = null;

  constructor() {
    makeAutoObservable(this);  // component to observe data from mobx
  }

  public login(email: string, password: string):void {
    const data = {
      email,
      password
    }

    this.userData = data;
    // this.loggedIn = true;
    this.error = 'some error'

    console.log('this.userData, this.loggedIn', this.userData, this.loggedIn);
  }

    // async login(email: string, password: string) {

    // !old code
    // const response = await loginStatus(email, password);

    // runInAction(() => {
    //   if (response.status === 200) {
    //     this.loggedIn = true;
    //     this.userData = response.data; // предположим, что response.data содержит нужные данные пользователя
    //   } else {
    //     this.loggedIn = false;
    //     this.userData = null;
    //   }
    // });

    //!
  // }

  public logout():void {
    this.loggedIn = false;
    this.userData = {}; // прверить что приходит в userdata
  }

}

export const userStore = new UserStore();
