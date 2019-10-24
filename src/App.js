import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import { Provider } from "react-redux";
import store from "./redux/store";
import SpinnerComponent from "./components/SpinnerComponent";
import Menu from "./components/Menu";
function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <Route exact path="/" component={Home} />
          <Route  path="/menu" component={Menu} />
        </Provider>
      </Router>
    </div>
  );
}

export default App;
