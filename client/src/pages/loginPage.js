import React, {Component} from 'react';
import axios from 'axios';
import {isAutehticated, getUserDetails, token} from "./Authentication"
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

    loginUser (_name, _password) {
     
      axios.post('http://localhost:3001/api/users/login', {
        name: _name,
        password: _password
      }).then((res)=> {
            setFooterMessage("User is logged in", 0);
            window.sessionStorage.name = res.data.name;    
            window.sessionStorage.email = res.data.email;    
            window.sessionStorage.token = res.data.token;    
          }, (err) => {
            return setFooterMessage(err.error, 1);
          } 
        );
    };

    registerNewUser (_name, _email, _password ) {
     
      axios.post('http://localhost:3001/api/users/', {
          name: _name,
          email: _email,     
          password: _password
      }).then(
          (res)=> {
            setFooterMessage("User is created", 0);
            //window.sessionStorage.userInfo = res.data;
            window.sessionStorage.name = res.data.name;    
            window.sessionStorage.email = res.data.email;    
            window.sessionStorage.token = res.data.token;   
        }, (error) => {
            return setFooterMessage(error.error, 1);
        } 
      );
    
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
              Token: <input
                type="text"
                value= {this.state._token}
                style={{ width: '200px' }} />
            </div>
            <div style={{ padding: '10px' }}>
                <button onClick={() => this.registerNewUser(this.state._name, this.state._email, this.state._password)}>
                    REGISTER
                </button>
                <button onClick={() => this.loginUser( this.state._name, this.state._password )}>
                    LOG IN
                </button>
            </div>
          </div>
        );
    }
}

export default LoginPage;