import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import { SvgSprite } from './components/baseComponents/SvgSprite';
import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <SvgSprite />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
