import './styles.scss';

import { Provider, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AlertBlock from './components/AlertBlock/AlertBlock';
import GamePage from './features/game/GamePage';
import HomePage from './features/home/HomePage';
import PlayerPage from './features/player/PlayerPage';
import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { selectAlert } from './features/home/store/home.selectors';
import store from './store';

const Routes = () => {
  const alert = useSelector(selectAlert);
  return (
    <div className="secret-santa">
      <AlertBlock alert={alert} />
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

// TODO (feat): Добавить переводы ошибок
const App = hot(Routes);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
