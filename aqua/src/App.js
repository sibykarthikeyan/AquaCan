import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Register from './components/register.component';
import Edit from './components/edit.component';
import Dashboard from './components/dashboard.component';
import Login from './components/login.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">AQUA</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/login'} className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/register'} className="nav-link">Register</Link>
                </li>
                
              </ul>
            </div>
          </nav>
          <Switch>
              <Route exact path='/' component={ Dashboard } />
              <Route exact path='/register' component={ Register } />
              <Route path='/edit/:id' component={ Edit } />
              <Route path='/login' component={ Login } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;