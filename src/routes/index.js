import React from "react";
import { Redirect } from "react-router-dom";

// Pages Component

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import ResetPwd from "../pages/Authentication/ResetPassword";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import ValidateMail from "../pages/Authentication/ValidateMail";

import Dashboard from "../pages/Dashboard";

import Profile from "../pages/Profile"
import ProfileChangePassword from "../pages/Profile/change-password"
import ProfileChangePhoto from "../pages/Profile/change-photo"

import User from "../pages/User"
import UserAdd from "../pages/User/add"
import UserEdit from "../pages/User/edit"
import UserChangePassword from "../pages/User/change-password"
import UserChangePhoto from "../pages/User/change-photo"

import Group from "../pages/Group"
import GroupAdd from "../pages/Group/add"
import GroupEdit from "../pages/Group/edit"

import Position from "../pages/Position"
import PositionAdd from "../pages/Position/add"
import PositionEdit from "../pages/Position/edit"
import PositionPermission from "../pages/Position/permission"

import OutgoingMail from "../pages/OutgoingMail"
import OutgoingMailCreate from "../pages/OutgoingMail/create"
import OutgoingMailDetail from "../pages/OutgoingMail/detail"
import OutgoingMailEdit from "../pages/OutgoingMail/edit"

import IncomingMail from "../pages/IncomingMail"
import IncomingMaillCreate from "../pages/IncomingMail/create"
import IncomingMailDetail from "../pages/IncomingMail/detail"
import IncomingMailEdit from "../pages/IncomingMail/edit"

import TemplateMail from "../pages/TemplateMail"
import TemplateMailCreate from "../pages/TemplateMail/create"
import TemplateMailEdit from "../pages/TemplateMail/edit"

import Classification from "../pages/Classification"
import ClassificationAdd from '../pages/Classification/add'
import ClassificationEdit from '../pages/Classification/edit'

import TypeMail from "../pages/TypeMail"
import TypeMailCreate from "../pages/TypeMail/create"

import CharMail from "../pages/CharMail"
import CharMailCreate from "../pages/CharMail/create"

import AuditTrail from "../pages/AuditTrail"


const authProtectedRoutes = [

  { path: "/dashboard", component: Dashboard },

  //Profile
  { path: "/profile", component: Profile },
  { path: "/profile-change-password", component: ProfileChangePassword },
  { path: "/profile-change-photo", component: ProfileChangePhoto },

  //User
  { path: "/user", component: User },
  { path: "/user-add", component: UserAdd },
  { path: "/user-edit", component: UserEdit },
  { path: "/user-change-password", component: UserChangePassword },
  { path: "/user-change-photo", component: UserChangePhoto },

  //Group
  { path: "/group", component: Group },
  { path: "/group-add", component: GroupAdd },
  { path: "/group-edit", component: GroupEdit },

  //OutgoingMail
  { path: "/outgoing-mail", component: OutgoingMail },
  { path: "/outgoing-mail-create", component: OutgoingMailCreate },
  { path: "/outgoing-mail-detail", component: OutgoingMailDetail },
  { path: "/outgoing-mail-edit", component: OutgoingMailEdit },

  //IncomingMail
  { path: "/incoming-mail", component: IncomingMail },
  { path: "/incoming-mail-create", component: IncomingMaillCreate },
  { path: "/incoming-mail-detail", component: IncomingMailDetail },
  { path: "/incoming-mail-edit", component: IncomingMailEdit },

  //Position
  { path: "/position", component: Position },
  { path: "/position-add", component: PositionAdd },
  { path: "/position-edit", component: PositionEdit },
  { path: "/position-permission", component: PositionPermission },

  //Template
  { path: "/template-mail", component: TemplateMail },
  { path: "/template-mail-create", component: TemplateMailCreate },
  { path: "/template-mail-edit", component: TemplateMailEdit },

  //Klasifikasi
  { path: "/classification", component: Classification },
  { path: "/classification-add", component: ClassificationAdd },
  { path: "/classification-edit", component: ClassificationEdit },

  //Tipe Surat
  { path: "/type-mail", component: TypeMail },
  { path: "/type-mail-create", component: TypeMailCreate },

  //Sifat Surat
  { path: "/char-mail", component: CharMail },
  { path: "/char-mail-create", component: CharMailCreate },

  { path: "/audit-trail", component: AuditTrail },


  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
  { path: "/forget-password", component: ForgetPwd },
  { path: "/reset-password/:params?", component: ResetPwd },
  { path: "/validate-mail", component: ValidateMail },
  { path: "/", exact: true, component: () => <Redirect to="/login" /> },

];

export { authProtectedRoutes, publicRoutes };
