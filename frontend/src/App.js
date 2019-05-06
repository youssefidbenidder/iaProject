import React, {Component} from 'react';
import './App.css';
import TwitterText from "./components/TwitterText"
import Text from "./components/Text"
import {BrowserRouter ,Switch , Route} from "react-router-dom"
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} component={Home}/>
            <Route path={"/text"} component={Text}/>
            <Route path={"/twitter"} component={TwitterText}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
