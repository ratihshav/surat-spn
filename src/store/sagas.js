import { all } from 'redux-saga/effects';

//public
import AccountSaga from './auth/register/saga';
import AuthSaga from './auth/login/saga';
import ForgetSaga from './auth/forgetpwd/saga';
import LayoutSaga from './layout/saga';

//business
import MasterUserSaga from './business/master-user/saga';



export default function* rootSaga() {
    yield all([
        //public
        AccountSaga(),
        AuthSaga(),
        ForgetSaga(),
        LayoutSaga(),
        MasterUserSaga()
    ])
}