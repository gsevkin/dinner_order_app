import React, {Component} from 'react';
import axios from 'axios';

class CustomerPage extends Component{
  state = {
    data: [],
    orderData: [],
    id: 0,
    CustomerName: null,
    CustomerPhone: null,
    PickupTime: null,
    ServeDate: null,
    DishName: null,
    Amount: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null  
  };
  //mount
  componentDidMount() {
    this.getOrderDataFromDb();
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

  getOrderDataFromDb = () => {
    fetch('http://localhost:3001/api/customer/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ orderData: res.data }));
  };

  putOrderDataToDB = ( CustomerName, CustomerPhone, PickupTime, DishName, Amount, ServeDate) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while(currentIds.includes(idToBeAdded)){
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/customer/putData', {
      id: idToBeAdded,
      CustomerName: CustomerName,
      CustomerPhone: CustomerPhone,
      DishName: DishName,
      Amount: Amount,
      DishID: 0,
      ServeDate: ServeDate,
      PickupTime: PickupTime,
    });
  };

  render() {
    return(
      <div style={{ padding: '10px' }}>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ CustomerName: e.target.value })}
            placeholder="Name"
            style={{ width: '200px' }}
          />
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ CustomerPhone: e.target.value })}
            placeholder="Phone Number"
            style={{ width: '200px' }}
          />
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ DishName: e.target.value })}
            placeholder="Name of the dish"
            style={{ width: '200px' }}
          />
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ Amout: e.target.value })}
            placeholder="Amount"
            style={{ width: '200px' }}
          />
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ PickupTime: e.target.value })}
            placeholder="When will you pick up?"
            style={{ width: '200px' }}
          />
        </div>
        <div  style={{ padding: '10px' }}>
        <button onClick={() => this.putOrderDataToDB(this.state.CustomerName, this.state.CustomerPhone, this.state.PickupTime, this.state.DishName, this.state.Amount, this.state.ServeDate)}>
            ORDER
          </button>
        </div>
      </div>
    );
  }
}

export default CustomerPage;
