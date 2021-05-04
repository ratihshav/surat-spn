import { all } from 'redux-saga/effects';

//public
import AuthSaga from './auth/login/saga';
import LayoutSaga from './layout/saga';
import ForgetSaga from './auth/forgetpwd/saga';

//business
import MasterUserSaga from './business/master-user/saga';
import MasterGroupSaga from './business/master-group/saga';
import OutgoingMailSaga from './business/outgoing-mail/saga'
import MasterPosition from './business/master-position/saga'

export default function* rootSaga() {
    yield all([
        //public
        AuthSaga(),
        LayoutSaga(),
        ForgetSaga(),
        MasterUserSaga(),
        MasterGroupSaga(),
        OutgoingMailSaga(),
        MasterPosition()
    ])
}