const Data = require('./../DataSchemas/data');
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

//get
router.get('/admin/getData', (req, res) => {
    Data.find((err, data) => {
      if(err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });

//update
router.post('/admin/updateData', auth.verifyToken,(req, res) => {
    const {id, update} = req.body;
    Data.findByIdAndUpdate(id, update, (err) => {
      if(err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
  
  //delete
  router.delete('/admin/deleteData', auth.verifyToken, (req, res) => {
    const { id } = req.body;
    console.log(`id to delete: ${req.body}`);
    Data.findByIdAndRemove(id, (err) => {
      if(err) return res.send(err);
      return res.json({ success: true });
    });
  });
  
  //create
  router.post('/admin/putData', auth.verifyToken, (req, res) => {
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

module.exports = router;