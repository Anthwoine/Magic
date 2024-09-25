
import { BrowserRouter as Router , Route } from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
//import App from './App';
import Home from './pages/home/Home';
import './styles/index.css';
import Detail from './pages/detail/detail';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>

      <Route exact path="/">
        <Home />
      </Route>


      <Route path="/detail/:cardId">
        <Detail />
      </Route>
      
    </Router>
    
  </React.StrictMode>
);


