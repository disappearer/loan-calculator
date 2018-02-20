export const FETCH_CONSTRAINTS_REQUEST = 'FETCH_CONSTRAINTS_REQUEST';
export const FETCH_CONSTRAINTS_SUCCESS = 'FETCH_CONSTRAINTS_SUCCESS';
export const FETCH_CONSTRAINTS_FAIL = 'FETCH_CONSTRAINTS_FAIL';

export const FETCH_OFFER_REQUEST = 'FETCH_OFFER_REQUEST';
export const FETCH_OFFER_SUCCESS = 'FETCH_OFFER_SUCCESS';
export const FETCH_OFFER_FAIL = 'FETCH_OFFER_FAIL';

export const SELECT_AMOUNT = 'SELECT_AMOUNT';
export const SELECT_TERM = 'SELECT_TERM';

export const selectAmount = amount => ({
  type: SELECT_AMOUNT,
  amount
});

export const selectTerm = term => ({
  type: SELECT_TERM,
  term
});

export const requestConstraints = () => ({
  type: FETCH_CONSTRAINTS_REQUEST
});

export const recieveConstraintsSuccess = constraints => ({
  type: FETCH_CONSTRAINTS_SUCCESS,
  constraints
});

export const recieveConstraintsFail = error => ({
  type: FETCH_CONSTRAINTS_SUCCESS,
  error
});

export const requestOffer = () => ({
  type: FETCH_OFFER_REQUEST
});

export const recieveOfferSuccess = offer => ({
  type: FETCH_OFFER_SUCCESS,
  offer
});

export const recieveOfferFail = error => ({
  type: FETCH_OFFER_SUCCESS,
  error
});
