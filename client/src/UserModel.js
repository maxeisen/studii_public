import { observable, action, decorate } from "mobx";

class UserModel {
  UserEmail = "";
  UserToken = "";

  SetEmail(val) {
    this.UserEmail = val;
  }
  SetToken(val) {
    this.UserToken = val;
  }
}
decorate(UserModel, {
  UserEmail: observable,
  SetEmail: action,
  UserToken: observable,
  SetToken: action
});

const UserStore = new UserModel();

export default UserStore;
