import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import AdminPage from './pages/adminPage';
import CustomerPage from "./pages/CustomerPage";
import "./items/navbar.css";
import React, { Component } from "react";

class App extends Component {  
  render() {
    return (
      <React.Fragment>
        <div class="topnav" style={{ padding: '10px' }}>
        <a class="active" onClick={(e) => window.location.assign("/CustomerPage")}>
            Home
          </a>
          <a onClick={(e) => window.location.assign("/AdminPage")}>
            Admin Page
          </a>
          <a onClick={(e) => window.location.assign("/CustomerPage")}>
            Customer Page
          </a>
        </div>
        <Router>
          <div>
            <Switch>
              <Route exact path="/AdminPage" component={AdminPage} />
              <Route exact path="/CustomerPage" component={CustomerPage} />
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;