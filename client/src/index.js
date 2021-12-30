import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StateContextProvider } from './contexts/StateContextProvider';
import { Web3ContextProvider } from './contexts/Web3ContextProvider';

ReactDOM.render(
  <React.StrictMode>
    <Web3ContextProvider>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Web3ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
