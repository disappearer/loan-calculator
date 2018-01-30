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
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onTermChange = this.onTermChange.bind(this);
    this.getOffer = this.getOffer.bind(this);
    this.debouncedGetOffer = debounce(this.getOffer, 200);
  }

  componentDidMount() {
    const { fetchConstraints } = this.props;
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
    const { fetchOffer } = this.props;
    fetchOffer(amount, term).then(json => {
      const { totalCostOfCredit, totalRepayableAmount, monthlyPayment } = json;
      this.setState({
        totalCostOfCredit,
        totalRepayableAmount,
        monthlyPayment
      });
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.amountInterval ? (
          <Input
            label="Total Amount"
            min={this.state.amountInterval.min}
            max={this.state.amountInterval.max}
            step={this.state.amountInterval.step}
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
        ) : null}
        {this.state.termInterval ? (
          <Input
            label="Term"
            min={this.state.termInterval.min}
            max={this.state.termInterval.max}
            step={this.state.termInterval.step}
            value={this.state.term}
            onChange={this.onTermChange}
          />
        ) : null}

        <div>
          <p>Total cost of credit: {this.state.totalCostOfCredit}</p>
          <p>Total repayable amount: {this.state.totalRepayableAmount}</p>
          <p>Monthly payment: {this.state.monthlyPayment}</p>
        </div>
      </div>
    );
  }
}

export default App;
