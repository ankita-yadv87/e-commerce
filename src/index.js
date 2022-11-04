import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./store";
import AlertTemplate from "react-alert-template-basic";
import { positions, transitions, Provider as AlertProvider } from "react-alert";

const root = ReactDOM.createRoot(document.getElementById('root'));

const options = {
  timeout: 5000,
  position: positions.TOP_CENTER,
  transition: transitions.SCALE,
};

root.render(
  <Provider store={store}>
   <AlertProvider template={AlertTemplate} {...options}>
   <React.StrictMode>
    <App />
  </React.StrictMode>
  </AlertProvider>
  </Provider>
);

reportWebVitals();
