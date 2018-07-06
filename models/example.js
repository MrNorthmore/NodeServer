var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ExampleSchema = new Schema({
    exampleString          : String
});

module.exports = mongoose.model('ExampleModel', ExampleSchema );