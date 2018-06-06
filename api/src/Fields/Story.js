const uuidV1 = require('uuid/v1');


class Story {

  constructor(app, pg ) {

    app.get('/story', async(req, res, next) => {
      pg.select('*').table('story').then((data) => {
        res.status(200).send({ data: data})
      })
    });

    app.get('/story/:uuid', async(req, res, next) => {
      pg.select('*').table('story').where({uuid: req.params.uuid}).then((data) => {
        res.status(200).send(data[0])
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
        res.status(200).send({ created: result[0]});
      }).catch((error) => {
        res.status(400).send({ message: error })
      });
      
    });

    app.post('/story/:uuid', async(req, res, next) => {
      pg.del().table('story').where({uuid: req.params.uuid}).then((result) => {
        res.status(200).send({ created: result[0]})
      }).catch((error) => {
        res.status(400).send({ message: error })
      })
    });

  }
}

module.exports = Story;