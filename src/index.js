import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import API from './api/api';

ReactDOM.render(<App api={API} />, document.getElementById('root'));
registerServiceWorker();
