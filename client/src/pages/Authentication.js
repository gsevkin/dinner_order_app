exports.getUserDetails = () => {
    var _data = [];
    const _token = window.sessionStorage.accessToken;

    var obj = {  
      method: 'POST',
      headers: {
        'authorization': _token
      }
    }
      
    fetch('http://localhost:3001/api/users/current', obj)
      .then((res) => {if(res.data) _data = res.data.userInfo });
          
    return _data;
}

exports.isAutehticated = () => {
    const _data = this.getUserDetails();
    if ( _data.length > 0)
        return true;
    else 
        return false;
} 
