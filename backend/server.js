const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const Data = require('./DataSchemas/data');
// const OrderData = require('./DataSchemas/OrderData');
const usersRoute = require("./routes/user.route");
const adminRoute = require("./routes/admin.route");
const customerRoute = require("./routes/customer.route");

// const config = require("config");


const API_PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());

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

app.use("/api/users", usersRoute);
app.use('/api', adminRoute);
app.use('/api', customerRoute);


//listen
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

