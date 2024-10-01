
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Home from './pages/home/Home';
import './styles/index.css';
import Detail from './pages/detail/detail';
import Erreur from './pages/erreur/Erreur';
import Preferences from './pages/preferences/Preferences';
import {PreferencesProvider} from "./context";





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>

    <PreferencesProvider>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>


            <Route path="/detail/:cardId">
                <Detail />
            </Route>

            <Route path="/preferences">
                <Preferences />
            </Route>

            <Route path="*">
                <Erreur />
            </Route>
        </Switch>
    </PreferencesProvider>

      
    </Router>
    
  </React.StrictMode>
);


