const API_URL =
  'https://js-developer-second-round.herokuapp.com/api/v1/application';

const api = {
  fetchConstraints: () => {
    return fetch(API_URL + '/constraints').then(response => response.json());
  },

  fetchOffer: (amount, term) => {
    const offerUrl =
      API_URL + `/real-first-loan-offer/?amount=${amount}&term=${term}`;
    return fetch(offerUrl).then(response => response.json());
  }
};

export default api;
