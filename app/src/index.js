import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import registerServiceWorker from './registerServiceWorker';
import './css/app.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
