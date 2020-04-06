import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import React, { Component } from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './src/reducer/index';
import { Provider } from 'react-redux';
import MainComponent from './src/component/Main';
import SearchComponet from './src/component/Farmer/Search';
import DealerLoginComponet from './src/component/Dealer/Login';
import DealerRegisterComponent from './src/component/Dealer/Register';
import SearchResultsComponent from './src/component/Farmer/SearchResults';
import DealerHome from './src/component/Dealer/Home';
import thunk from 'redux-thunk';
import DealerAddNewVegetable from './src/component/Dealer/AddNewVegetable';

const AppNavigator = createStackNavigator({
  Main: {
    screen: MainComponent,
  },
  CropSearch: {
    screen: SearchComponet
  },
  DealerLogin: {
    screen: DealerLoginComponet
  },
  DealerRegister: {
    screen: DealerRegisterComponent
  },
  CropSearchResults: {
    screen: SearchResultsComponent
  },
  DealerHome: {
    screen: DealerHome
  },
  DealerAddNewVegetable: {
    screen: DealerAddNewVegetable
  },
  initialRouteName: 'Main'
});

let middleware = [];
middleware = [...middleware, thunk];

const store = createStore(rootReducer, compose(applyMiddleware(...middleware)));

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return ( 
      <Provider store = { store }>
        <AppContainer />
      </Provider>
    )
  }
}