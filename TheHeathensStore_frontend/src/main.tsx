import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// --- IMPORT CSS TỪ NODE_MODULES (Thư viện ngoài) ---
// import './assets/vendor/bootstrap/css/bootstrap.css'
// import 'font-awesome/css/font-awesome.min.css';
// import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
// import 'animate.css/animate.min.css';
// import 'hamburgers/dist/hamburgers.min.css';



import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './assets/fonts/iconic/css/material-design-iconic-font.min.css';
import './assets/fonts/linearicons-v1.0.0/icon-font.min.css';
import './assets/vendor/animate/animate.css';
import './assets/vendor/css-hamburgers/hamburgers.min.css';

import './assets/css/util.css';
import './assets/css/main.css';


import App from './App.tsx';

// Chỉ giữ lại MỘT lệnh render duy nhất
const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}