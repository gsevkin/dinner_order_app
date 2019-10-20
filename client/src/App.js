import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import AdminPage from './pages/adminPage';
import CustomerPage from "./pages/CustomerPage";
import React, { Component } from "react";

class App extends Component {  
  render() {
    return (
      <React.Fragment>
        <div style={{ padding: '10px' }}>
          <button onClick={(e) => window.location.assign("/AdminPage")}>
            Admin Page
          </button>
          <button onClick={(e) => window.location.assign("/CustomerPage")}>
            Customer Page
          </button>
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