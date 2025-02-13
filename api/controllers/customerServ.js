module.exports = () => {
    const customerServDB = require('../data/customerServ.json');
    const controller = {};
  
    controller.listCustomerServ = (req, res) => res.status(200).json(customerServDB);
  
    return controller;
  }