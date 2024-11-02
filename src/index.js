import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './AuthContext';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

axios.defaults.baseURL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8001'
        : 'https://todo.olgageyfmanorlova.page/api';

axios.defaults.headers.token = sessionStorage.getItem('token');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
