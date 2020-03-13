import React from 'react';
import './App.css';
import history from './config/history'

import {
  Router,
  Route
} from "react-router-dom";
import Index from './component/index';
import Signup from './component/signup/signup';
import Login from './component/login/login';

export default function App() {
  return (
    <Router history={history}>
      <div>
        <Route path="/index" component={Index} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

