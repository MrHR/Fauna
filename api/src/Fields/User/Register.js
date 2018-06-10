const uuidV1 = require('uuid')
const md5 = require('md5')

class Register {

  constructor( app, pp, pg ) {
    app.post('/register', async(req, res) => {
      const toInsert = req.body;
      toInsert['uuid'] = uuidV1()
      toInsert['password'] = md5(toInsert['password'])

      console.log("register body", req.body);

      await pg.insert(toInsert).table('users').then((data) => {
        res.status(200).send(data)
      })
      .catch((error) => {
        res.status(400).send(error.message)
      })
      
    })
  }
}

module.exports = Register;