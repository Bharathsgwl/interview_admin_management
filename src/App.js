import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";
//import SpinnerComponent from "./components/SpinnerComponent";
import Menu from "./components/Menu";
import Login from "./components/Login/index";

function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <Route exact path="/" component={Login} />

          <Route path="/menu" component={Menu} />
        </Provider>
      </Router>
    </div>
  );
}

export default App;
