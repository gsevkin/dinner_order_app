import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import AdminPage from './pages/adminPage';
import CustomerPage from "./pages/CustomerPage";
import LoginPage from "./pages/loginPage";
import React, { Component } from "react";
import {isAutehticated, getUserDetails} from "./pages/Authentication"
import "./items/navbar.css";

class App extends Component {  
  render() {
    return (
      <React.Fragment>
        <div className="topnav" style={{ padding: '0px' }}>
          <a className="active" onClick={(e) => window.location.assign("/CustomerPage")}>Home</a>
          <a onClick={(e) => window.location.assign("/AdminPage")}>Admin Page</a>
          <a onClick={(e) => window.location.assign("/CustomerPage")}>Customer Page</a>
          {
            isAutehticated() ? 
            <b>{getUserDetails().name}</b> :
            <a className="login" onClick={(e) => window.location.assign("/LoginPage")}>Login</a> 
          }
        </div>
        <Router>
          <div>
            <Switch>
              <Route exact path="/AdminPage" component={AdminPage} />
              <Route exact path="/CustomerPage" component={CustomerPage} />
              <Route exact path="/LoginPage" component={LoginPage} />
            </Switch>
          </div>
        </Router>
        <div className="footer" style={{ padding: '10px' }}>
          <a type="input" id="Footer" ></a>
        </div>
      </React.Fragment>
    );
  }
}

export default App;