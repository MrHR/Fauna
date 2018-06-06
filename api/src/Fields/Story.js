const uuidV1 = require('uuid/v1');
const { requiresLogin } = require('./../Utils/Auth')

class Story {

  constructor(app, pp, pg ) {
    //get story list
    app.get('/story', async(req, res, next) => {
      pg.select('*').table('story').then((data) => {
        res.status(200).send({ data: data})
      })
    });

    //read story
    app.get('/story/:uuid', async(req, res, next) => {
      pg.select('*').table('story').where({uuid: req.params.uuid}).then((data) => {
        res.status(200).send(data[0])
      })
    });

    //create story
    app.post('/story', requiresLogin,  async(req, res, next) => {
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

    //update story
    app.post('/update_story', requiresLogin,  async(req, res, next) => {
      console.log("\x1b[34m", 'updating', req.body);

      const toUpdate = {
        title: req.body.title,
        description: req.body.description
      }

      pg.update(toUpdate).table('story').where({uuid: req.body.uuid}).returning(["uuid", "title", "description"]).then((result) => {
        res.status(200).send({ updated: result[0] })
      }).catch((error) => {
        res.status(400).send({ message: error })
      });

    });

    //delete story
    app.del('/story/:uuid', requiresLogin,  async(req, res, next) => {
      pg.del().table('story').where({uuid: req.params.uuid}).then((result) => {
        res.status(200).send({ created: result[0]})
      }).catch((error) => {
        res.status(400).send({ message: error })
      })
    });

  }
}

module.exports = Story;