exports.getUserDetails = () => {
    var _data = [];
    fetch('http://localhost:3001/api/users/current')
      .then((data) => data.json())
      .then((res) => { _data = res.data });
    return _data;
}

exports.isAutehticated = () => {
    const _data = this.getUserDetails();
    if ( _data.length > 0)
        return true;
    else 
        return false;
} 




