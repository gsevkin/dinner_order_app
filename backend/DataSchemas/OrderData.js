const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//data structure
const DataSchema = new Schema(
    {
        id: Number,
        CustomerName: String,
        CustomerPhone: String,
        PickupTime: String,
        DishID: Number,
        DishName: String,
        Amount: Number,
        ServeDate: String
    },
    {timestamps: true}
);

//export
module.exports = mongoose.model("OrderData", DataSchema);