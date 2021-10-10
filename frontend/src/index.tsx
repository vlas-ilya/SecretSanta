import './styles.scss';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import GamePage from './features/game/GamePage';
import HomePage from './features/home/HomePage';
import PlayerPage from './features/player/PlayerPage';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import store from './store';

const Routes = () => {
  return (
    <div className="secret-santa">
      <Router>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/game/:id" component={GamePage} />
          <Route path="/player/:id" component={PlayerPage} />
        </Switch>
      </Router>
    </div>
  );
};

// TODO (feat): Отображать информацию об ошибках
// TODO (feat): Задеплоить на сервер
const App = hot(Routes);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
