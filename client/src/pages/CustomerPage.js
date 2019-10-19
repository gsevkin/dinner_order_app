import React, {Component} from 'react';
import axios from 'axios';

class CustomerPage extends Component{

  render() {
    return(
      <div style={{ padding: '10px' }}>
        <button onClick={(e) => window.location.assign("/AdminPage")}>
          Login!
        </button>
      </div>
    );
  }
}

export default CustomerPage;
