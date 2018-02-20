import {
  FETCH_CONSTRAINTS_REQUEST,
  FETCH_CONSTRAINTS_SUCCESS,
  FETCH_CONSTRAINTS_FAIL,
  FETCH_OFFER_REQUEST,
  FETCH_OFFER_SUCCESS,
  FETCH_OFFER_FAIL,
  SELECT_AMOUNT,
  SELECT_TERM
} from '../actions';

const defaultState = {
  amountInterval: null,
  termInterval: null,
  amount: 0,
  term: 0,
  totalCostOfCredit: 0,
  totalRepayableAmount: 0,
  monthlyPayment: 0,
  isFetchingConstraints: true,
  isFetchingOffer: true,
  error: null
};

const reducer = (state = defaultState, action = { type: '' }) => {
  switch (action.type) {
    case FETCH_CONSTRAINTS_REQUEST:
      return { ...state, isFetchingConstraints: true };
    case FETCH_CONSTRAINTS_SUCCESS:
      const { amountInterval, termInterval } = action.constraints;
      return {
        ...state,
        isFetchingConstraints: false,
        amountInterval,
        termInterval,
        amount: amountInterval.defaultValue,
        term: termInterval.defaultValue
      };
    case FETCH_CONSTRAINTS_FAIL:
      return {
        ...state,
        isFetchingConstraints: false,
        error: action.error
      };
    case FETCH_OFFER_REQUEST:
      return { ...state, isFetchingOffer: true };
    case FETCH_OFFER_SUCCESS:
      const {
        totalCostOfCredit,
        totalRepayableAmount,
        monthlyPayment
      } = action.offer;
      return {
        ...state,
        isFetchingOffer: false,
        totalCostOfCredit,
        totalRepayableAmount,
        monthlyPayment
      };
    case FETCH_OFFER_FAIL:
      return {
        ...state,
        isFetchingOffer: false,
        error: action.error
      };
    case SELECT_AMOUNT:
      return {
        ...state,
        amount: action.amount
      };
    case SELECT_TERM:
      return {
        ...state,
        term: action.term
      };
    default:
      return state;
  }
};

export default reducer;
