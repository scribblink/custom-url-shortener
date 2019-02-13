import React, { Component } from 'react';
import './App.css';
import ShortenForm from './components/ShortenForm';
import ShortenOutput from './components/ShortenOutput';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <header className="App-header">
          <Route exact path="/" component={ShortenForm} />
          <Route
            path="/:namespace?/:id"
            component={ShortenOutput}
          />
          

          </header>
        </Router>
        
      </div>
    );
  }
}

export default App;
