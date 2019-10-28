const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./DataSchemas/data');
const OrderData = require('./DataSchemas/OrderData');
const usersRoute = require("./routes/user.route");
const config = require("config");


const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

app.use(express.json());
app.use("/api/users", usersRoute);

//database
const dbRoute = 'mongodb+srv://admin-user:admin-test@dinnerorders-bid27.mongodb.net/test?retryWrites=true&w=majority';

// connect to database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to database'));

//check if connection is successful
db.on('error', console.error.bind(console, 'MongoDB connection error'));

//logging
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//get
router.get('/admin/getData', (req, res) => {
  Data.find((err, data) => {
    if(err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

//get
router.get('/customer/getData', (req, res) => {
  OrderData.find((err, data) => {
    if(err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

//update
router.post('/admin/updateData', (req, res) => {
  const {id, update} = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if(err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

//delete
router.delete('/admin/deleteData', (req, res) => {
  const { id } = req.body;
  console.log(`id to delete: ${req.body}`);
  Data.findByIdAndRemove(id, (err) => {
    if(err) return res.send(err);
    return res.json({ success: true });
  });
});

//create
router.post('/admin/putData', (req, res) => {
  let data = new Data();

  const { id, message, price, dishName, serveDate, capacity } = req.body;

  console.log(`data save to DB, id: ${id} message: ${message} dishName: ${dishName} serveDate: ${serveDate}`)

  if((!id && id != 0) || !message){ 
    return res.json({
      success: false,
      error: 'INVALID INPUT'
    });
  }
  data.message = message;
  data.id = id;
  data.dishName = dishName;
  data.price = price;
  data.serveDate = serveDate;
  data.capacity = capacity;
  data.save((err) => {
    if(err) return res.json({ success: false, error: err });
    return res.json({ success: true });
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

// append
app.use('/api', router);

//listen
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

