const uuidV1 = require('uuid/v1');


class Story {

  constructor( app, pg ) {

    app.get('/encounter/:uuid', async(req, res, next) => {
      pg.select('*').table('encounter').where({uuid: req.params.uuid}).then((data) => {
        res.send(200, data[0])
      }).catch((error) => {
        res.send(400, error)
      })
    })
    

     app.get('/encounterparts/:uuid', async(req, res, next) => {
      console.log("init")
      pg.select('*').table('encounter_part').where({encounter_uuid: req.params.uuid}).then((data) => {
        res.send(200, data)
      })
    })


     app.post('/encounterpart', async(req, res, next) => {
      console.log("init")
      const data = {
        uuid: uuidV1(),
        cta: req.body.cta,
        follows: req.body.follows,
        story_text: req.body.story_text,
        encounter_uuid: req.body.encounter_uuid
      }
      pg.insert(data).table('encounter_part').returning([ 'uuid', 'cta', 'follows' ]).then((data) => {
        res.send(200, data)
      })
    })

    app.get('/encounter/story/:uuid', async(req, res, next) => {
      console.log(req.params.uuid)
      pg.select('*').table('encounter').where({story_uuid: req.params.uuid}).then((data) => {
        console.log(data.length)
        res.send(200, data)
      })
    })


    app.post('/encounter', async(req, res, next) => {
      console.log(req.body)

      const start = req.body.start;
      const results = [];
      const toInsert = {
        uuid: uuidV1(),
        story_uuid: req.body.story_uuid,
        description: req.body.description
      }

      pg.insert(toInsert).table('encounter').then((r) => {
        const eUuid = uuidV1();
        pg.insert({story_text: req.body.start, encounter_uuid: toInsert.uuid, uuid: eUuid}).table('encounter_part').returning(["uuid", "story_text", "follows", "cta"]).then((encounterPart) => {
          pg.update({start_encounter_part_uuid: eUuid}).table('encounter').where({ uuid: toInsert.uuid}).returning(["uuid", "character_uuid", "description", "story_uuid"]).then((result) => {
            res.send(200, { created: result[0], part: encounterPart});
          }).catch((error) => {
          res.send(400)
        })
        }).catch((error) => {
          res.send(400)
        })
      }).catch((error) => {
        res.send(400, { message: error })
      })
      
    })

  }
}

module.exports = Story;