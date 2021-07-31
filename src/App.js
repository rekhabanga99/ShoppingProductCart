import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navigation.js'
import HomeScreen from './components/Home'
import CartScreen from './components/Cart'

class App extends Component {
  render() {
    return (
       <BrowserRouter>
            <div className="App">
            
              <Navbar/>
                <Switch>
                    <Route exact path="/" component={HomeScreen}/>
                    <Route path="/cart" component={CartScreen}/>
                  </Switch>
             </div>
       </BrowserRouter>
      
    );
  }
}

export default App;
