const OrderData = require('./../DataSchemas/OrderData');
const express = require("express");
const router = express.Router();

//get
router.get('/customer/getData', (req, res) => {
    OrderData.find((err, data) => {
      if(err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });

//create order
router.post('/customer/putData', (req, res) => {
    let data = new OrderData();
  
    const { id, CustomerName, CustomerPhone, PickupTime, DishID, DishName, Amount, ServeDate } = req.body;
  
    console.log(`data save to DB, id: ${id} dishName: ${DishName}  Amount: ${Amount} CustomerName: ${CustomerName} CustomerPhone: ${CustomerPhone} serveDate: ${ServeDate} pickup time: ${PickupTime}`)
  
    if((!id && id != 0) || !CustomerName){ 
      return res.json({
        success: false,
        error: 'INVALID INPUT'
      });
    }
    data.id = id;
    data.CustomerName = CustomerName;
    data.CustomerPhone = CustomerPhone;
    data.DishName = DishName;
    data.Amount = Amount;
    data.DishID = DishID;
    data.ServeDate = ServeDate;
    data.PickupTime = PickupTime;
    data.save((err) => {
      if(err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });

module.exports = router;