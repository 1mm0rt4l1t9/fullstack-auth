import { createAction } from '../../utils/action-helpers';
import storage from 'redux-persist/lib/storage';
import { put, call, takeLatest } from 'redux-saga/effects';
import { persistReducer } from 'redux-persist';

import { register, login } from '../../crud/auth.crud';

const CLEAR_REG = 'auth/CLEAR_REG';
const REG_REQUEST = 'auth/REG_REQUEST';
const REG_SUCCESS = 'auth/REG_SUCCESS';
const REG_FAIL = 'auth/REG_FAIL';

const CLEAR_LOGIN = 'auth/CLEAR_LOGIN';
const LOGIN_REQUEST = 'quth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';

const LOGOUT = 'auth/LOGOUT';

const initialState = {
  user: undefined,
  authToken: undefined,

  regLoading: false,
  regSuccess: false,
  regError: null,

  loginLoading: false,
  loginSuccess: false,
  loginError: null,
};

export const reducer = persistReducer(
  { storage, key: 'auth', whitelist: ['user', 'authToken'] },
  (state = initialState, action) => {
    switch (action.type) {
      case CLEAR_REG: {
        return { ...state, regLoading: false, regSuccess: false, regError: null };
      }

      case REG_REQUEST: {
        return { ...state, regLoading: true, regSuccess: false, regError: null };
      }

      case REG_SUCCESS: {
        return { ...state, regLoading: false, regSuccess: true };
      }

      case REG_FAIL: {
        return { ...state, regLoading: false, regError: action.payload };
      }

      case CLEAR_LOGIN: {
        return { ...state, loginLoading: false, loginSuccess: false, loginError: null };
      }

      case LOGIN_REQUEST: {
        return { ...state, loginLoading: true, loginSuccess: false, loginError: null };
      }

      case LOGIN_SUCCESS: {
        return {
          ...state,
          user: action.payload?.userId,
          authToken: action.payload?.token,
          loginLoading: false,
          loginSuccess: true,
        };
      }

      case LOGIN_FAIL: {
        return { ...state, loginLoading: false, loginError: action.payload };
      }

      case LOGOUT: {
        return initialState;
      }

      default: {
        return state;
      }
    }
  },
);

export const actions = {
  clearReg: () => createAction(CLEAR_REG),
  regRequest: (payload) => createAction(REG_REQUEST, payload),
  regSuccess: (payload) => createAction(REG_SUCCESS, payload),
  regFail: (payload) => createAction(REG_FAIL, payload),

  clearLogin: () => createAction(CLEAR_LOGIN),
  loginRequest: (payload) => createAction(LOGIN_REQUEST, payload),
  loginSuccess: (payload) => createAction(LOGIN_SUCCESS, payload),
  loginFail: (payload) => createAction(LOGIN_FAIL, payload),

  logout: () => createAction(LOGOUT),
};

function* regSaga({ payload }) {
  try {
    const { data } = yield call(() => register(payload));
    yield put(actions.regSuccess(data));
  } catch (e) {
    yield put(actions.regFail(e?.response?.data?.message || 'Ошибка соединения!'));
  }
}

function* loginSaga({ payload }) {
  try {
    const { data } = yield call(() => login(payload));
    yield put(actions.loginSuccess(data));
  } catch (e) {
    yield put(actions.loginFail(e?.response?.data?.message) || 'Ошибка соединения!');
  }
}

export function* saga() {
  yield takeLatest(REG_REQUEST, regSaga);
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
