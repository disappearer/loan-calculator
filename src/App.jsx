import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Input from './components/Input';
const debounce = require('debounce');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountInterval: null,
      termInterval: null,
      amount: 30,
      term: 15,
      totalCostOfCredit: 0,
      totalRepayableAmount: 0,
      monthlyPayment: 0
    };
    this.cache = {};
    this.debouncedGetOffer = debounce(this.getOffer, 200);
  }

  componentDidMount() {
    const { fetchConstraints } = this.props.api;
    fetchConstraints().then(json => {
      const { amountInterval, termInterval } = json;
      this.setState({
        amountInterval,
        termInterval,
        amount: amountInterval.defaultValue,
        term: termInterval.defaultValue
      });
      this.getOffer(amountInterval.defaultValue, termInterval.defaultValue);
    });
  }

  onAmountChange(e) {
    const amount = e.target.value;
    this.setState({ amount });
    this.debouncedGetOffer(amount, this.state.term);
  }

  onTermChange(e) {
    const term = e.target.value;
    this.setState({ term });
    this.debouncedGetOffer(this.state.amount, term);
  }

  getOffer(amount, term) {
    const { fetchOffer } = this.props.api;
    const key = `${amount}:${term}`;
    if (key in this.cache) {
      // log for demonstration purpose
      console.log('cached');
      this.setState(this.cache[key]);
    } else {
      fetchOffer(amount, term).then(json => {
        const {
          totalCostOfCredit,
          totalRepayableAmount,
          monthlyPayment
        } = json;
        const cacheObject = {
          totalCostOfCredit,
          totalRepayableAmount,
          monthlyPayment
        };
        this.cache[key] = cacheObject;
        // log for demonstration purpose
        console.log('fetched');
        this.setState(cacheObject);
      });
    }
  }

  render() {
    const {
      amountInterval,
      termInterval,
      amount,
      term,
      totalCostOfCredit,
      totalRepayableAmount,
      monthlyPayment
    } = this.state;
    return (
      <div className="App">
        {amountInterval ? (
          <Input
            label="Total Amount"
            min={amountInterval.min}
            max={amountInterval.max}
            step={amountInterval.step}
            value={amount}
            onChange={e => this.onAmountChange(e)}
          />
        ) : null}
        {termInterval ? (
          <Input
            label="Term"
            min={termInterval.min}
            max={termInterval.max}
            step={termInterval.step}
            value={term}
            onChange={e => this.onTermChange(e)}
          />
        ) : null}

        <div>
          <p>Total cost of credit: {totalCostOfCredit}</p>
          <p>Total repayable amount: {totalRepayableAmount}</p>
          <p>Monthly payment: {monthlyPayment}</p>
        </div>
      </div>
    );
  }
}

export default App;
