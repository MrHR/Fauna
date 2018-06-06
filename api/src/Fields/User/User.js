
const Login = require('./Login');
const Register = require('./Register');

class User {
  constructor( app, pp, pg ) {
    new Login(app, pp, pg);
    new Register(app, pp, pg);
  }

}

module.exports = User