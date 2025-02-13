
module.exports = app => {
    const controller = require('../controllers/customerServ')();

    app.route('/api/v1/customerServ')
        .get(controller.listCustomerServ);
}