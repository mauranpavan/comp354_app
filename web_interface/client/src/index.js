import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { WSV } from './wsv';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WSV />
    </BrowserRouter>
  </React.StrictMode>
);
