const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//data structure
const DataSchema = new Schema(
    {
        id: Number,
        dishName: String,
        message: String,
        price: Number,
        serveDate: String
    },
    {timestamps: true}
);

//export
module.exports = mongoose.model("Data", DataSchema);