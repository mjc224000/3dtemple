import React, { Component } from 'react';
import Main from './component/Main'
import {BrowserRouter} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Main/>
        </BrowserRouter>

    );
  }
}

export default App;
