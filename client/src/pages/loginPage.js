import React, {Component} from 'react';
import axios from 'axios';
import {isAutehticated, getUserDetails} from "./Authentication"
import {setFooterMessage, getDateNowDDMMYYYY} from '../helper';


class LoginPage extends Component{
    //init state
    state = {
      data: [],
      _name: null,
      _password: null,
      _email: null,
      intervalIsSet: false
    };
  
    //mount
    componentDidMount() {
      if(!this.state.intervalIsSet) {
        let interval = setInterval(getUserDetails, 1000);
        this.setState({ intervalIsSet: interval });
      }
    }
  
    //unmount
    componentWillUnmount() {
      if(this.state.intervalIsSet) {
        clearInterval(this.state.intervalIsSet);
        this.setState({ intervalIsSet: false });
      }
    }
  
    registerNewUser = (_state) => {
     
      const {_name, _email, _password} = _state;
        
      axios.post('http://localhost:3001/api/users', {
        name: _name,
        email: _email,
        password: _password
      }).then(setFooterMessage("User registered successfully!", 0), setFooterMessage("User cannot be registered!", 1));

    };

    render() {
        const { data } = this.state;
        return (
          <div>
            <div style={{ padding: '10px' }}>
              User Name: <input
                type="text"
                onChange={(e) => this.setState({ _name: e.target.value })}
                placeholder="User name"
                style={{ width: '200px' }} />
            </div>
            <div style={{ padding: '10px' }}>
              Password: <input
                type="password"
                onChange={(e) => this.setState({ _password: e.target.value })}
                placeholder="Password"
                style={{ width: '200px' }} />
            </div>
            <div style={{ padding: '10px' }}>
              Email: <input
                type="text"
                onChange={(e) => this.setState({ _email: e.target.value })}
                placeholder="e-mail address"
                style={{ width: '200px' }} />
            </div>
            <div style={{ padding: '10px' }}>
                <button onClick={() => this.registerNewUser(this.state)}>
                    REGISTER
                </button>
            </div>
          </div>
        );
    }
}

export default LoginPage;