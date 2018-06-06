const { requiresLogin } = require('./../../Utils/Auth')

class Login {

  constructor( app, pp, pg ) {
    console.log(pp)
    app.post('/login', pp.authenticate('local', {session: true}), async(req, res) => {
      console.log(req.user,'thus authenticated')
      res.send(req.user);
    })
    app.post('/logout', async(req, res) => {
      console.log('logged out')
      res.send(200);
    })
    app.get('/user/info', requiresLogin, async(req, res) => {

      res.send(200, req.user)
    })
    
  }
}

module.exports = Login;