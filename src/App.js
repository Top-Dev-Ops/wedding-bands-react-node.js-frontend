import { Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';

import Home from './pages/Home';

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Provider>
  );
}

export default App;
