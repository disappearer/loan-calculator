import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import { selectAmount, selectTerm } from './actions';
import './App.css';
import Input from './components/Input';
const debounce = require('debounce');

const App = ({
  amountInterval,
  termInterval,
  amount,
  term,
  totalCostOfCredit,
  totalRepayableAmount,
  monthlyPayment,
  onAmountChange,
  onTermChange,
  isFetchingConstraints,
  isFetchingOffer
}) => (
  <div className="App">
    {!isFetchingConstraints ? (
      <div>
        <Input
          label="Total Amount"
          min={amountInterval.min}
          max={amountInterval.max}
          step={amountInterval.step}
          value={amount}
          onChange={onAmountChange}
        />
        <Input
          label="Term"
          min={termInterval.min}
          max={termInterval.max}
          step={termInterval.step}
          value={term}
          onChange={onTermChange}
        />
      </div>
    ) : (
      <div>Fetching constraints...</div>
    )}
    {!isFetchingOffer ? (
      <div>
        <p>Total cost of credit: {totalCostOfCredit}</p>
        <p>Total repayable amount: {totalRepayableAmount}</p>
        <p>Monthly payment: {monthlyPayment}</p>
      </div>
    ) : (
      <div>Fetching offer...</div>
    )}
  </div>
);

App.propTypes = {
  amountInterval: PropTypes.object,
  termInterval: PropTypes.object,
  amount: PropTypes.number.isRequired,
  term: PropTypes.number.isRequired,
  totalCostOfCredit: PropTypes.number.isRequired,
  totalRepayableAmount: PropTypes.number.isRequired,
  monthlyPayment: PropTypes.number.isRequired,
  onAmountChange: PropTypes.func.isRequired,
  onTermChange: PropTypes.func.isRequired,
  isFetchingConstraints: PropTypes.bool.isRequired,
  isFetchingOffer: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAmountChange: e => dispatch(selectAmount(e.target.value)),
    onTermChange: e => dispatch(selectTerm(e.target.value))
  };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
