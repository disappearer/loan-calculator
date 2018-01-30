import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const API_URL =
  'https://js-developer-second-round.herokuapp.com/api/v1/application';

const fetchConstraints = () => {
  return fetch(API_URL + '/constraints').then(response => response.json());
};

const fetchOffer = (amount, term) => {
  const offerUrl =
    API_URL + `/real-first-loan-offer/?amount=${amount}&term=${term}`;
  return fetch(offerUrl).then(response => response.json());
};

ReactDOM.render(
  <App fetchConstraints={fetchConstraints} fetchOffer={fetchOffer} />,
  document.getElementById('root')
);
registerServiceWorker();
