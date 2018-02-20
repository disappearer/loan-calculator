import { delay } from 'redux-saga';
import { put, call, take, fork, takeLatest, select } from 'redux-saga/effects';
import { selectedAmount, selectedTerm } from '../reducers/selectors';
import * as actions from '../actions';
import api from '../api/api';

export function* fetchConstraints() {
  try {
    yield put(actions.requestConstraints());
    const constraints = yield call(api.fetchConstraints);
    yield put(actions.recieveConstraintsSuccess(constraints));
  } catch (error) {
    yield put(actions.recieveConstraintsFail(error));
  }
}

let cache = {};
export function* fetchOffer(amount, term) {
  try {
    const key = `${amount}:${term}`;
    let offer;
    if (key in cache) {
      offer = cache[key];
    } else {
      yield put(actions.requestOffer());
      offer = yield call(api.fetchOffer, amount, term);
      cache[key] = offer;
    }
    yield put(actions.recieveOfferSuccess(offer));
  } catch (error) {
    yield put(actions.recieveOfferFail(error));
  }
}

export function* handleAmountChange() {
  yield call(delay, 200);
  const amount = yield select(selectedAmount);
  const term = yield select(selectedTerm);
  yield call(fetchOffer, amount, term);
}

export function* watchAmountChange() {
  yield takeLatest(actions.SELECT_AMOUNT, handleAmountChange);
}

export function* handleTermChange() {
  yield call(delay, 200);
  const amount = yield select(selectedAmount);
  const term = yield select(selectedTerm);
  yield call(fetchOffer, amount, term);
}

export function* watchTermChange() {
  yield takeLatest(actions.SELECT_TERM, handleTermChange);
}

export function* root() {
  yield call(fetchConstraints);
  const amount = yield select(selectedAmount);
  const term = yield select(selectedTerm);
  yield call(fetchOffer, amount, term);
  yield fork(watchAmountChange);
  yield fork(watchTermChange);
}
