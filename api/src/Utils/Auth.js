const jwt = require('jwt-simple');
const secret = "xxx"

module.exports = {
  requiresLogin: (req, res, next) => {
    //console.log(req.headers)
    if(req.headers.authorization) {
      const token = jwt.decode(req.headers.authorization, secret)
      //console.log(token);
      req.user = token;
      if(token) return next()
    }
    res.status(401).send({message: "not logged in"})
  }
}