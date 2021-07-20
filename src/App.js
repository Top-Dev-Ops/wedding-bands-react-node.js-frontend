import { Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';

import Home from './pages/Home';
import Order from './pages/Order';

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/order" component={Order} />
      </Switch>
    </Provider>
  );
}

export default App;
