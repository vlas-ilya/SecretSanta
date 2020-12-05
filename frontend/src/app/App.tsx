import './App.scss';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import GamePage from '../features/game/GamePage';
import HomePage from '../features/home/HomePage';
import PlayerPage from '../features/player/PlayerPage';
import React from 'react';
import RegistrationPage from '../features/registration/RegistrationPage';
import { hot } from 'react-hot-loader/root';

const App = () => {
  return (
    <div className="secret-santa">
      <Router>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/game/:id" component={GamePage} />
          <Route path="/player/registration/:id" component={RegistrationPage} />
          <Route path="/player/:id" component={PlayerPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default hot(App);
