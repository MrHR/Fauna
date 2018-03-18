const uuidV1 = require('uuid/v1');


class Story {

  constructor( app, pg ) {

    app.get('/story', async(req, res, next) => {
      pg.select('*').table('story').then((data) => {
        res.send(200, { data: data})
      })
    });

    app.get('/story/:uuid', async(req, res, next) => {
      pg.select('*').table('story').where({uuid: req.params.uuid}).then((data) => {
        res.send(200, data[0])
      })
    });

    app.post('/story', async(req, res, next) => {
      const results = [];
      const toInsert = {
        uuid: uuidV1(),
        title: req.body.title,
        description: req.body.description
      }
      
      pg.insert(toInsert).table('story').returning(["uuid", "title", "description"]).then((result) => {
        res.send(200, { created: result[0]});
      }).catch((error) => {
        res.send(400, { message: error })
      });
      
    });

    app.post('/story/:uuid', async(req, res, next) => {
      pg.del().table('story').where({uuid: req.params.uuid}).then((result) => {
        res.send(200, { created: result[0]})
      }).catch((error) => {
        res.send(400, { message: error })
      })
    });

  }
}

module.exports = Story;