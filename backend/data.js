const mongose = require('mongoose');
const Schema = mongose.Schema;

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
module.exports = mongose.model("Data", DataSchema);