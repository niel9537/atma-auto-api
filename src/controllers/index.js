const { JsonWebTokenError } = require('jsonwebtoken');
<<<<<<< HEAD
=======
const service = require('./controller-service');
>>>>>>> 73c0fcc (upd:for nielchan)
const sparepart = require('./controller-sparepart');
const user = require('./controller-user');
const jwt = require('jsonwebtoken');
function verifyUser(req, res, next) {
  const bearer = req.headers.bearer;
  jwt.verify(bearer, 'secret', (err,data)=>{
    if (err) {
      console.log(err.message);
      res.json(err);
      return
    }
    req.body = data;
    next()
  });

}
module.exports = {
  sparepart,
  user,
<<<<<<< HEAD
=======
  service,
>>>>>>> 73c0fcc (upd:for nielchan)
  verifyUser,
};