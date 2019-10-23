import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import Question_section from './components/Question_section';
import Interview_Posts from './components/Interview_Posts';
import Home from './components/Home';
import {Provider} from 'react-redux';
import store from './redux/store';
import SpinnerComponent from './components/SpinnerComponent';
import CandidatePostMap from './components/CandidatePostMap/index';

function App() {
  return (
    <div className="App">

      <Router>
      <Provider store={store} >
        <Route exact path="/" component={Home} />
      <Route exact path="/posts" component={Interview_Posts} />
        <Route exact path="/posts/questions" component={ Question_section} />
        <Route exact path="/candidatepostmap" component={ CandidatePostMap} />
      </Provider>
      </Router>
    </div>
  );
}

export default App;
