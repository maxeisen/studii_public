import React from "react";
import { Provider } from "mobx-react";
import UserStore from "./UserModel";

export default ({ children }) => (
  <Provider store={UserStore}>{children}</Provider>
);
