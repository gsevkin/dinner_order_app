const mongose = require('mongoose');
const Schema = mongose.Schema;

//data structure
const DataSchema = new Schema(
    {
        id: Number,
        message: String
    },
    {timestamps: true}
);

//export
module.exports = mongose.model("Data", DataSchema);