import React, {Component} from 'react';
import axios from 'axios';

class AdminPage extends Component{
  //init state
  state = {
    data: [],
    id: 0,
    message: null,
    dishName: null,
    price: null,
    serveDate: null,
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
  
  putDataToDB = (message, price, dishName, serveDate) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while(currentIds.includes(idToBeAdded)){
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/admin/putData', {
      id: idToBeAdded,
      message: message,
      price: price,
      dishName: dishName,
      serveDate: serveDate
    });
  };

  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/admin/deleteData', {
      data: {
        id: objIdToDelete,
      },
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
            type="text"
            onChange={(e) => this.setState({ price: e.target.value })}
            placeholder="Price"
            style={{ width: '200px' }}
          />
        </div>
        <div  style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ serveDate: e.target.value })}
            placeholder="Date"
            style={{ width: '200px' }}
          />
        </div>
        <div style={{ padding: '10px' }}>
          <button onClick={() => this.putDataToDB(this.state.message, this.state.price, this.state.dishName, this.state.serveDate)}>
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
                  {dat.price} <br />
                  <span style={{ color: 'gray' }}> date: </span>
                  {dat.serveDate}
                </li>
              ))}
        </ul>
      </div>
    );
  }
}

export default AdminPage;
