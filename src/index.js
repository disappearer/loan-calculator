import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const API_URL =
  'https://js-developer-second-round.herokuapp.com/api/v1/application';

const getConstraints = () => {
  return fetch(API_URL + '/constraints').then(response => response.json());
};

const getOffer = (amount, term) => {
  const offerUrl = API_URL + `/first-loan-offer/?amount=${amount}&term=${term}`;
  return fetch(offerUrl).then(response => response.json());
};

ReactDOM.render(
  <App getConstraints={getConstraints} getOffer={getOffer} />,
  document.getElementById('root')
);
registerServiceWorker();
