import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import './components/auth.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import App from './App';
import axios from 'axios';
import TodoRegister from './components/todoRegister';
import TodoLogin from './components/todoLogin';
import reportWebVitals from './reportWebVitals';
import { ResetPassword } from './components/resetPassword';
import { ForgotPassword } from './components/forgotPassword';
import { CurrentPassword } from './components/currentPassword';

//baseurl where all 
axios.defaults.baseURL = "http://localhost:8080/"

axios.defaults.withCredentials = true;


ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <Routes>
    <Route path='/' element={<TodoLogin />} />
    <Route path='/todoRegister' element={<TodoRegister />} />
    <Route path='/reset' element={<ResetPassword />} />
    <Route path='/forgotPassword' element={<ForgotPassword />} />
    <Route path='/reset-password/:resetToken' element={<CurrentPassword />} />


    <Route path='/app' element={<App />} />

    </Routes>

  </React.StrictMode>,
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
