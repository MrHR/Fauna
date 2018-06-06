const uuidV1 = require('uuid')
const md5 = require('md5')

class Register {

  constructor( app, pp, pg ) {
    app.post('/register', async(req, res) => {
      const toInsert = req.body;
      toInsert['uuid'] = uuidV1()
      toInsert['password'] = md5(toInsert['password'])
      await pg.insert(toInsert).table('users').then((data) => {
        res.status(200).send(data)
      })
    })
  }
}

module.exports = Register;