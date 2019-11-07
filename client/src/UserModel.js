import { observable, action, decorate } from "mobx";
import { create, persist } from "mobx-persist";

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

const schema = {
  UserEmail: true,
  UserToken: true
};

const UserStore = persist(schema)(new UserModel());

export default UserStore;

const hydrate = create({});

hydrate("user", UserStore).then(() =>
  console.log("UserStore has been hydrated")
);
