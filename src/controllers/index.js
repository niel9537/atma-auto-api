const { JsonWebTokenError } = require('jsonwebtoken');
const service = require('./controller-service');
const sparepart = require('./controller-sparepart');
const user = require('./controller-user');
const employee = require('./controller-employee');
const customer = require('./controller-customer');
const supplier = require('./controller-supplier');
const inventory = require('./controller-inventory');
const transaksi = require('./controller-transaksi');
const jwt = require('jsonwebtoken');
//update
function verifyUser(req, res, next) {
  const bearer = req.headers.bearer;
  jwt.verify(bearer, 'secret', (err,data)=>{
    if (err) {
      console.log(err.message);
      res.status(400).json(err);
      return
    }
    // req.body = data;
    //
    next()
  });

}
module.exports = {
  sparepart,
  user,
  service,
  verifyUser,
  employee,
  customer,
  supplier,
  inventory,
  transaksi
};