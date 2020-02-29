import { observable, action, decorate } from "mobx";
import { create, persist } from "mobx-persist";

class UserModel {
  UserEmail = "";
  UserIsStudent = null;
  UserToken = "";
  UserId = "";

  SetUserId(val){
    this.UserId = val;
  }
  SetIsStudent(val){
    this.UserIsStudent = val;
  }
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
  UserIsStudent: observable,
  SetIsStudent: action,
  UserId: observable,
  SetUserId: action,
  UserToken: observable,
  SetToken: action
});

const schema = {
  UserEmail: true,
  UserIsStudent: true,
  UserToken: true,
  UserId: true
};

const UserStore = persist(schema)(new UserModel());

export default UserStore;

const hydrate = create({});

hydrate("user", UserStore).then(() =>
  console.log("UserStore has been hydrated")
);
