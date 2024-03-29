import React, {Component} from 'react';
import axios from 'axios';
import {setFooterMessage, getDateNowDDMMYYYY} from '../helper';

class AdminPage extends Component{
  //init state
  state = {
    data: [],
    id: 0,
    message: null,
    dishName: null,
    price: null,
    serveDate: getDateNowDDMMYYYY(),
    capacity: 10,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null  
  };

  //mount
  componentDidMount() {
    this.getDataFromDb();
    if(!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
    var today = getDateNowDDMMYYYY();
    this.setState({ serveDate: today });
  }

  //unmount
  componentWillUnmount() {
    if(this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch('http://localhost:3001/api/admin/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };
  
  putDataToDB = (message, price, dishName, serveDate, capacity) => {
    let currentIds = this.state.data.map((data) => data.id);
    let maxID = -1;
    let idToBeAdded = 0;
        
    for(var i = 0; i<currentIds.length; ++i){ 
      if (currentIds[i] > maxID)
        maxID = currentIds[i];
     }
      
    idToBeAdded = maxID+1;

    // while(currentIds.includes(idToBeAdded)){
    //   ++idToBeAdded;
    // }

    const header = {
      'Content-Type': 'application/json',
      'Authorization': window.sessionStorage.token
    }

    axios.post('http://localhost:3001/api/admin/putData', {
      id: idToBeAdded,
      message: message,
      price: price,
      dishName: dishName,
      serveDate: serveDate,
      capacity: capacity
    }, {headers: header});

    if(idToBeAdded != null)
      setFooterMessage(`Item Added! ${dishName}will be served on ${serveDate}`, 0);

  };

  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });
    
    if(objIdToDelete == null)
    {
      setFooterMessage(`ID: ${idTodelete} couldn't found!`, 1);
      return;
    }
    else
      setFooterMessage(`ID: ${idTodelete} found and deleted!`, 0);

    const header = {
      'Content-Type': 'application/json',
      'Authorization': window.sessionStorage.token
    }

    axios.delete('http://localhost:3001/api/admin/deleteData', {
      data: {
        id: objIdToDelete,
      },
      headers: header
    });
  };
  
  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      <div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ dishName: e.target.value })}
            placeholder="new dish in the menu!"
            style={{ width: '200px' }}
            
          />
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="content"
            style={{ width: '200px' }} 
          />
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="number" min="1" step="any"
            onChange={(e) => this.setState({ price: e.target.value })}
            placeholder="Price"
            style={{ width: '200px' }}  
          />
        </div>
        <div  style={{ padding: '10px' }}>
          <input
            type="date"
            onChange={(e) => this.setState({ serveDate: e.target.value })}
            style={{ width: '200px' }}
            value={this.state.serveDate}
          />
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="number" min="1"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ capacity: e.target.value })}
            value={this.state.capacity}
          />
        </div>
        <div style={{ padding: '10px' }}>
          <button onClick={() => this.putDataToDB(this.state.message, this.state.price, this.state.dishName, this.state.serveDate, this.state.capacity)}>
            ADD
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
        </div>
        <div  style={{ padding: '10px' }}>
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <ul>
          {data.length <= 0
            ? 'NO DB ENTRIES YET'
            : data.map((dat) => (
                <li style={{ padding: '10px' }} key={data.message}>
                  <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
                  <span style={{ color: 'gray' }}> data: </span> 
                  {dat.dishName} <br />
                  <span style={{ color: 'gray' }}> content: </span>
                  {dat.message} <br />
                  <span style={{ color: 'gray' }}> price: </span>
                  {dat.price} 
                  <span style={{ color: 'gray' }}> date: </span>
                  {dat.serveDate}
                </li>
              ))}
        </ul>
        <br /><br />
      </div>
    );
  }
}

export default AdminPage;
