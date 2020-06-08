import { all } from 'redux-saga/effects';

//public
import AccountSaga from './auth/register/saga';
import AuthSaga from './auth/login/saga';
import ForgetSaga from './auth/forgetpwd/saga';
import LayoutSaga from './layout/saga';

//business
import MasterUserSaga from './business/master-user/saga';
import MasterGroupSaga from './business/master-group/saga';
import OutgoingMailSaga from './business/outgoing-mail/saga'

export default function* rootSaga() {
    yield all([
        //public
        AccountSaga(),
        AuthSaga(),
        ForgetSaga(),
        LayoutSaga(),
        MasterUserSaga(),
        MasterGroupSaga(),
        OutgoingMailSaga()
    ])
}