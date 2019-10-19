const mongose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();


//database
const dbRoute = 'mongodb+srv://admin-user:admin-test@dinnerorders-bid27.mongodb.net/test?retryWrites=true&w=majority';

// connect to database
mongose.connect(dbRoute, { useNewUrlParser: true });

let db = mongose.connection;

db.once('open', () => console.log('connected to database'));

//check if connection is successful
db.on('error', console.error.bind(console, 'MongoDB connection error'));

//logging
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//get
router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if(err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

//update
router.post('/updateData', (req, res) => {
  const {id, update} = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if(err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

//delete
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  console.log(`id to delete: ${req.body}`);
  Data.findByIdAndRemove(id, (err) => {
    if(err) return res.send(err);
    return res.json({ success: true });
  });
});

//create
router.post('/putData', (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if((!id && id != 0) || !message){ 
    return res.json({
      success: false,
      error: 'INVALID INPUT'
    });
  }
  data.message = message;
   data.id = id;
  data.save((err) => {
    if(err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


// append
app.use('/api', router);

//listen
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

