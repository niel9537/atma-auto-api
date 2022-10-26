const { JsonWebTokenError } = require('jsonwebtoken');
const service = require('./controller-service');
const sparepart = require('./controller-sparepart');
const user = require('./controller-user');
const employee = require('./controller-employee');
const customer = require('./controller-customer');
const jwt = require('jsonwebtoken');
//update
function verifyUser(req, res, next) {
  const bearer = req.headers.bearer;
  jwt.verify(bearer, 'secret', (err,data)=>{
    if (err) {
      console.log(err.message);
      res.json(err);
      return
    }
    // req.body = data;
    next()
  });

}
module.exports = {
  sparepart,
  user,
  service,
  verifyUser,
  employee,
  customer
};