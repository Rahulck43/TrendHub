import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'tailwindcss/tailwind.css';
// import '../style.css'
import {
  Input,
  Ripple,
  initTE,
} from "tw-elements";

initTE({ Input, Ripple });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
