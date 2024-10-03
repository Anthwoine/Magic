
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
import {CartProvider} from "./context/cartItem";
import Favoris from "./pages/favoris/Favoris";
import Paiement from "./pages/paiement/Paiement";





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>

        <CartProvider>
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

                <Route path="/favoris">
                    <Favoris />
                </Route>

                <Route path='/paiement'>
                    <Paiement />
                </Route>

                <Route path="*">
                    <Erreur />
                </Route>
            </Switch>

        </PreferencesProvider>
        </CartProvider>

      
    </Router>
    
  </React.StrictMode>
);


