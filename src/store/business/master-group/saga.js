import { takeEvery, fork, put, all, call, takeLatest } from 'redux-saga/effects';

// Master Group Redux States
import {
  GET_MASTER_GROUP,
  SAVE_MASTER_GROUP,
  DELETE_MASTER_GROUP,
  UPDATE_MASTER_GROUP,
  GET_DETAIL_GROUP
} from './actionTypes';

import {
  getMasterGroupSuccess,
  getMasterGroupFail,
  saveMasterGroupSuccess,
  saveMasterGroupFail,
  deleteMasterGroupSuccess,
  deleteMasterGroupFail,
  updateMasterGroupSuccess,
  updateMasterGroupFail,
  getDetailGroupSuccess,
  getDetailGroupFail
} from './actions';

import {
  getMasterGroupServices,
  saveMasterGroupService,
  deleteMasterGroupService,
  updateMasterGroupService,
  getDetailGroupService
} from '../../../helpers/master/group';

//AUTH related methods
import { getFirebaseBackend } from '../../../helpers/authUtils';


function* getMasterGroupSaga({ payload }) {
  try {
    const response = yield call(getMasterGroupServices, payload);
    yield put(getMasterGroupSuccess(response));
  } catch (error) {
    yield put(getMasterGroupFail(error));
  }
}

function* saveMasterGroupSaga({ payload: { request } }) {
  try {
    const response = yield call(saveMasterGroupService, request);
    yield put(saveMasterGroupSuccess(response));
  } catch (error) {
    yield put(saveMasterGroupFail(error));
  }
}

function* deleteMasterGroupSaga({ payload: { request } }) {
  try {
    const response = yield call(deleteMasterGroupService, request);
    yield put(deleteMasterGroupSuccess(response));
  } catch (error) {
    yield put(deleteMasterGroupFail(error));
  }
}

function* updateMasterGroupSaga({ payload: { request } }) {
  try {
    const response = yield call(updateMasterGroupService, request);
    yield put(updateMasterGroupSuccess(response));
  } catch (error) {
    yield put(updateMasterGroupFail(error));
  }
}

function* getDetailGroupSaga({ payload: { request } }) {
  try {
    const response = yield call(getDetailGroupService, request);
    yield put(getDetailGroupSuccess(response));
  } catch (error) {
    yield put(getDetailGroupFail(error));
  }
}

export function* watchGetMasterGroup() {
  yield takeLatest(GET_MASTER_GROUP, getMasterGroupSaga)
}

export function* watchSaveMasterGroup() {
  yield takeEvery(SAVE_MASTER_GROUP, saveMasterGroupSaga)
}

export function* watchDeleteMasterGroup() {
  yield takeEvery(DELETE_MASTER_GROUP, deleteMasterGroupSaga)
}

export function* watchUpdateMasterGroup() {
  yield takeEvery(UPDATE_MASTER_GROUP, updateMasterGroupSaga)
}

export function* watchGetDetailGroup() {
  yield takeEvery(GET_DETAIL_GROUP, getDetailGroupSaga)
}

function* MasterGroupSaga() {
  yield all([
    fork(watchGetMasterGroup),
    fork(watchSaveMasterGroup),
    fork(watchDeleteMasterGroup),
    fork(watchUpdateMasterGroup),
    fork(watchGetDetailGroup)
  ]);
}

export default MasterGroupSaga;