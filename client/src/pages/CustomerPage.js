import React, {Component} from 'react';
import axios from 'axios';
import "../items/foodcard.css"; 
import {setFooterMessage} from '../helper';

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
    DishID: null,
    Amount: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null  
  };
  
  //mount
  componentDidMount() {
    this.getOrderDataFromDb();
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

  getOrderDataFromDb = () => {
    fetch('http://localhost:3001/api/customer/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ orderData: res.data }));
  };

  getDataFromDb = () => {
    fetch('http://localhost:3001/api/admin/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  putOrderDataToDB = ( CustomerName, CustomerPhone, PickupTime, DishName, dishID, Amount, ServeDate) => {
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
      DishID: dishID,
      ServeDate: ServeDate,
      PickupTime: PickupTime,
    });

    if (idToBeAdded)
      setFooterMessage(`Order Completed! You will pick up ${DishName} on ${ServeDate}`)
  };

  onFoodSelect = (dishName, dishID, capacity) =>{
    this.setState({ DishName: dishName });
    this.setState({ DishID: dishID });

    var amountInput = document.getElementById("Amount");
    var remCapacity = capacity - this.getOrderedAmount(dishID);

    amountInput.max=remCapacity;
  };

  getOrderedAmount = (dishID)=>{
    let orderedAmout = 0;

    this.state.orderData.forEach((dat) => {
      if (dat.DishID == dishID)
        orderedAmout += dat.Amount;
    });
    
    return orderedAmout;
  }

  assignCardOnclickMethod = (dat)=>{
    if (dat.capacity - this.getOrderedAmount(dat.id) >0)
      return () => this.onFoodSelect( dat.dishName, dat.id, dat.capacity ) ;
    else
      return ()=>{};
  }

  render() {
    const { data } = this.state;

    return(
    <div>
      {data.length <= 0
        ? 'NO DB ENTRIES YET'
        : data.map((dat, i) => (
            <div className="row" id={dat.id}>
              <div className="column">
                <div className="card" onClick={this.assignCardOnclickMethod(dat)}>
                  <h3>{dat.dishName}</h3>
                  <p>{dat.message}</p>
                  <p>{dat.serveDate}</p>
                  <p>{dat.price}€</p>
                  <p>Remaining: {dat.capacity - this.getOrderedAmount(dat.id) }</p>
                </div>
              </div>
            </div>  
          ))}
          
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <div style={{ padding: '10px' }}>
          <div style={{ padding: '10px' }}>
            <input
              type="text"
              placeholder="Name"
              style={{ width: '200px' }}
              onChange={(e) => this.setState({ CustomerName: e.target.value })}
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
              placeholder="Name of the dish"
              style={{ width: '200px' }} 
              value={ this.state.DishName ? this.state.DishName : ""}
              readOnly="true" 
            />
          </div>
          <div style={{ padding: '10px' }}>
            <input
              id="Amount"
              type="number" min="1" step="any"
              onChange={(e) => this.setState({ Amount: e.target.value })}
              placeholder="Amount"
              style={{ width: '200px' }}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <input
              type="time" min="16:00" max="20:00" required
              onChange={(e) => this.setState({ PickupTime: e.target.value })}
              placeholder="When will you pick up?"
              style={{ width: '200px' }}
            />
          </div>
          <div  style={{ padding: '10px' }}>
          <button onClick={() => this.putOrderDataToDB(this.state.CustomerName, this.state.CustomerPhone, this.state.PickupTime, this.state.DishName, this.state.DishID, this.state.Amount, this.state.ServeDate)}>
              ORDER
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerPage;
