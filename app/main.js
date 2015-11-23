import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import controller from './controller';
import {Container} from 'cerebral-react';

ReactDOM.render(<Container controller={controller}><App /></Container>, document.getElementById('root'));
