import React, { lazy } from "react";
import { Redirect } from "react-router-dom";

// Pages Component

// Authentication related pages
const Login = lazy(() => import("../pages/Authentication/Login"));
const Logout = lazy(() => import("../pages/Authentication/Logout"));
const ResetPwd = lazy(() => import("../pages/Authentication/ResetPassword"));
const ForgetPwd = lazy(() => import("../pages/Authentication/ForgetPassword"));
const ValidateMail = lazy(() => import("../pages/Authentication/ValidateMail"));

const Dashboard = lazy(() => import("../pages/Dashboard"));

const Profile = lazy(() => import("../pages/Profile"));
const ProfileChangePassword = lazy(() => import("../pages/Profile/change-password"));
const ProfileChangePhoto = lazy(() => import("../pages/Profile/change-photo"));

const User = lazy(() => import("../pages/User"));
const UserAdd = lazy(() => import("../pages/User/add"));
const UserEdit = lazy(() => import("../pages/User/edit"));
const UserChangePassword = lazy(() => import("../pages/User/change-password"));
const UserChangePhoto = lazy(() => import("../pages/User/change-photo"));

const Group = lazy(() => import("../pages/Group"));
const GroupAdd = lazy(() => import("../pages/Group/add"));
const GroupEdit = lazy(() => import("../pages/Group/edit"));

const Position = lazy(() => import("../pages/Position"));
const PositionAdd = lazy(() => import("../pages/Position/add"));
const PositionEdit = lazy(() => import("../pages/Position/edit"));
const PositionPermission = lazy(() => import("../pages/Position/permission"));

const OutgoingMail = lazy(() => import("../pages/OutgoingMail"));
const OutgoingMailCreate = lazy(() => import("../pages/OutgoingMail/create"));
const OutgoingMailDetail = lazy(() => import("../pages/OutgoingMail/detail"));
const OutgoingMailEdit = lazy(() => import("../pages/OutgoingMail/edit"));

const IncomingMail = lazy(() => import("../pages/IncomingMail"));
const IncomingMaillCreate = lazy(() => import("../pages/IncomingMail/create"));
const IncomingMailDetail = lazy(() => import("../pages/IncomingMail/detail"));
const IncomingMailEdit = lazy(() => import("../pages/IncomingMail/edit"));

const TemplateMail = lazy(() => import("../pages/TemplateMail"));
const TemplateMailCreate = lazy(() => import("../pages/TemplateMail/create"));
const TemplateMailEdit = lazy(() => import("../pages/TemplateMail/edit"));

const Classification = lazy(() => import("../pages/Classification"));
const ClassificationAdd = lazy(() => import("../pages/Classification/add"));
const ClassificationEdit = lazy(() => import("../pages/Classification/edit"));


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
