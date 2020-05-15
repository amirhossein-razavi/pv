import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ConfigureStore from './Redux/ConfigureStore';

import Navigation from './Components/Navigation'

const store = ConfigureStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default App;
