import React from "react";
import { Redirect } from "react-router-dom";

// Pages Component

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/FogetPassword";

import Dashboard from "../pages/Dashboard";

import Profile from "../pages/Profile"

import User from "../pages/User"
import UserAdd from "../pages/User/add"
import UserEdit from "../pages/User/edit"
import UserDetail from "../pages/User/detail"
import UserChangePassword from "../pages/User/change-password"
import UserChangePhoto from "../pages/User/change-photo"

import Group from "../pages/Group"
import GroupAdd from "../pages/Group/add"
import GroupEdit from "../pages/Group/edit"
import GroupDetail from "../pages/Group/detail"

import OutgoingMail from "../pages/OutgoingMail"
import OutgoingMailCreate from "../pages/OutgoingMail/create"
import OutgoingMailDetail from "../pages/OutgoingMail/detail"

import Position from "../pages/Position"

const authProtectedRoutes = [
  

  { path: "/dashboard", component: Dashboard },
  { path: "/profile", component: Profile },

  //User
  { path: "/user", component: User },
  { path: "/user-add", component: UserAdd },
  { path: "/user-edit", component: UserEdit },
  { path: "/user-detail", component: UserDetail },
  { path: "/user-change-password", component: UserChangePassword },
  { path: "/user-change-photo", component: UserChangePhoto },

  //Group
  { path: "/group", component: Group },
  { path: "/group-add", component: GroupAdd },
  { path: "/group-edit", component: GroupEdit },
  { path: "/group-detail", component: GroupDetail },

  //Mail
  { path: "/outgoing-mail", component: OutgoingMail },
  { path: "/outgoing-mail-create", component: OutgoingMailCreate },
  { path: "/outgoing-mail-detail", component: OutgoingMailDetail },

  //Position
  { path: "/position", component: Position },
  // { path: "/position-create", component: PositionCreate },
  // { path: "/position-edit", component: PositionEdit },

  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/", exact: true, component: () => <Redirect to="/login" /> },
  { path: "/logout", component: Logout },
  { path: "/forget-password", component: ForgetPwd },
  { path: "/pages-register", component: Register },

];

export { authProtectedRoutes, publicRoutes };
