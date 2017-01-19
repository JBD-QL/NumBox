const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const numBoxSchema = new Schema({
  box1: {type: Number, required: true},
  box2: {type: Number, required: true},
  box3: {type: Number, required: true},
  box4: {type: Number, required: true}
});

const numBox = mongoose.model('boxnums', numBoxSchema);

module.exports = numBox;