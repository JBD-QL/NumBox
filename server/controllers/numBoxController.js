const numBox = require('./../models/numBoxModel');

module.exports = {
  save: (req, res) => {
    const data = req.body;
    numBox.remove({}, (err) => {
      if (err) {
        res.statusCode = 400;
        return res.send(err);
      }
    });
    numBox.create(data, (err, nums) => {
      if (err) {
        res.statusCode = 400;
        return res.send(err);
      } else {
        res.statusCode = 200;
        return res.send(nums);
      }
    });
  },

  retrieve: (req, res) => {
    numBox.findOne({}, (err, nums) => {
      if (err) {
        res.statusCode = 400;
        return res.send(err);
      } else {
        res.statusCode = 200;
        return res.send(nums);
      }
    });
  }
};