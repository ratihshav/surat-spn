import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";

//Business
import MasterUser from "./business/master-user/reducer";
import MasterGroup from "./business/master-group/reducer";
import OutgoingMail from "./business/outgoing-mail/reducer"
import MasterPosition from './business/master-position/reducer';

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  MasterUser,
  MasterGroup,
  OutgoingMail,
  MasterPosition
});

export default rootReducer;
