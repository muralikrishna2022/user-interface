import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './homepage'
import Login from './Login'
import Register from './Register'
import Profile from './Profile';
import Posts from './Post'
import { UserProvider } from './usercontext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profilepage" element={<Profile />} />
        <Route path="/userposts" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>
);
