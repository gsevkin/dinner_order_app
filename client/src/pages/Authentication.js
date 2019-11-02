exports.getUserDetails = () => {
  var _data = {};
    
  if (window.sessionStorage.token){ 
    _data.name = window.sessionStorage.name;
    _data.email = window.sessionStorage.email;
    _data.token = window.sessionStorage.token;
  }
    //const _token = window.sessionStorage.accessToken;

    // var obj = {  
    //   method: 'POST',
    //   headers: {
    //     'authorization': _token
    //   }
    // }
      
    // fetch('http://localhost:3001/api/users/current', obj)
    //   .then((res) => {if(res.data) _data = res.data.userInfo });


  return _data;
}

exports.isAutehticated = () => {
    const _data = this.getUserDetails();
    if ( _data.name )
        return true;
    else 
        return false;
} 
