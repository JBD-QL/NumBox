const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/boxnums');

const Schema = mongoose.Schema;

const boxNumsSchema = new Schema({
  box1: {type: Number, required: true},
  box2: {type: Number, required: true},
  box3: {type: Number, required: true},
  box4: {type: Number, required: true}
});

const boxNums = mongoose.model('boxnums', boxNumsSchema);

module.exports = boxNums;