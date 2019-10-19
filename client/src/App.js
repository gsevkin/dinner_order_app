import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import AdminPage from './pages/adminPage';
import CustomerPage from "./pages/CustomerPage";
import React, { Component } from "react";

class App extends Component {  
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/AdminPage" component={AdminPage} />
            <Route exact path="/CustomerPage" component={CustomerPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;