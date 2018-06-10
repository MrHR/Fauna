const uuidV1 = require('uuid/v1');
const { requiresLogin } = require('./../Utils/Auth')


class Story {

  constructor( app, pp, pg) {

    //read encounter
    app.get('/encounter/:uuid', async(req, res, next) => {
      pg
      .select(['encounter.uuid', 'encounter.description', 'encounter.start_encounter_part_uuid', 'encounter_part.story_text'])
      .from('encounter')
      .join('encounter_part', 'encounter.start_encounter_part_uuid', '=', 'encounter_part.uuid')
      .where('encounter.uuid', req.params.uuid)
      .then((data) => {
        console.log("\x1b[34m", data)
        res.status(200).send(data[0]);
      }).catch((error) => {
        res.status(400).send(error);
      });
    });

    //read encounter part
    app.get('/encounterpart/:uuid', async(req, res, next) => {
      console.log('fetch encounterpart', req.params)
      pg.select('*').table('encounter_part').where({uuid: req.params.uuid}).then((data) => {
        res.status(200).send(data[0]);
      }).catch((error) => {
        res.status(400).send(error);
      });
    });

    //get encounter list for story
    app.get('/encounter/story/:uuid', async(req, res, next) => {
      pg.select('*').table('encounter').where({story_uuid: req.params.uuid}).then((data) => {
        res.status(200).send(data);
      });
    });

    //get encounter part list for encounter
    app.get('/encounterparts/:uuid', async(req, res, next) => {
      pg.select('*').table('encounter_part').where({encounter_uuid: req.params.uuid}).then((data) => {
        res.status(200).send(data);
      });
    });

    //create encounter
    app.post('/encounter', requiresLogin, async(req, res, next) => {
      const start = req.body.start;
      const results = [];
      const toInsert = {
        uuid: uuidV1(),
        story_uuid: req.body.story_uuid,
        description: req.body.description
      }

      pg.insert(toInsert).table('encounter').then((r) => {
        const eUuid = uuidV1();
        pg
        .insert({story_text: req.body.start, encounter_uuid: toInsert.uuid, uuid: eUuid, cta: toInsert.description})
        .table('encounter_part')
        .returning(["uuid", "story_text", "follows", "cta"])
        .then((encounterPart) => {
          pg
          .update({start_encounter_part_uuid: eUuid})
          .table('encounter')
          .where({ uuid: toInsert.uuid})
          .returning(["uuid", "description", "story_uuid"])
          .then((result) => { 
            res.status(200).send({ created: result[0], part: encounterPart});
          })
          .catch((error) => {
            res.send(400);
          })
        }).catch((error) => {
          res.send(400);
        })

      }).catch((error) => {
        res.status(400).send( { message: error });
      });
      
    });

    //create encounterpart
    app.post('/encounterpart', requiresLogin, async(req, res, next) => {
      const data = {
        uuid: uuidV1(),
        cta: req.body.cta,
        follows: req.body.follows,
        story_text: req.body.story_text,
        encounter_uuid: req.body.encounter_uuid
      }

      pg
      .insert(data)
      .table('encounter_part')
      .returning([ 'uuid', 'cta', 'follows', 'encounter_uuid' ])
      .then((data) => {
        res.status(200).send(data);
      });
    });

    //update encounter
    app.patch('/encounter', async(req, res, next) => {
      //console.log("\x1b[35m", req.body)

      const start = req.body.start;
      const toUpdate = {
        description: req.body.description
      }

      pg
      .update(toUpdate)
      .table('encounter')
      .where({uuid: req.body.uuid})
      .returning(["uuid", "start_encounter_part_uuid", "description"])
      .then((enc) => {
        //console.log("\x1b[36m", "heyoo", enc)

        pg
        .update({story_text: req.body.start, cta: toUpdate.description})
        .table('encounter_part')
        .where({uuid: enc[0].start_encounter_part_uuid})
        .returning(["uuid", "story_text"])
        .then((result) => {

          //console.log("\x1b[32m", result)

          const resData = {
            uuid: enc[0].uuid,
            description: enc[0].description,
            story_text: result[0].story_text,
            start_encounter_part_uuid: enc[0].start_encounter_part_uuid
          }

          res.status(200).send({created: resData})
        })
        .catch((error) => {
          //console.log('failed @ first encounter part update', error)
          res.status(400).send(error.message)
        })

      })
      .catch((error) => {
        //console.log('failed at encounter update', error)
        res.status(400).send(error.message)
      });

    });

    //update encounter part
    app.patch('/encounterpart', requiresLogin, async(req, res, next) => {
      //console.log("\x1b[35m", req.body)

      const toUpdate = {
        cta: req.body.cta,
        story_text: req.body.story_text
      }

      pg
      .update(toUpdate)
      .table('encounter_part')
      .where({uuid: req.body.update})
      .returning(["uuid", "cta", "story_text", "follows", "encounter_uuid"])
      .then((result) => {
        console.log("\x1b[35m", result[0])
        res.status(200).send({data: result[0]});
      })
      .catch((error) => {
        res.status(400).send({error: error.message});
      });

    });

    //delete encounter
    app.del('/encounter/:uuid', requiresLogin, async(req, res, next) => {

      console.log('params ',req.params)

      pg
      .del()
      .table('encounter_part')
      .where({encounter_uuid: req.params.uuid})
      .returning("uuid")
      .then(() => {
        pg
        .del()
        .table('encounter')
        .where({uuid: req.params.uuid})
        .then((result) => {
          res.status(200).send({data: result})
        }).catch((error) => {
          console.log('error on the deleting encounter', error.message)
          res.status(400).send({error: error.message})
        })
      })
      .catch((error) => {
        console.log('error deleting encounter parts from encounter', error.message)
        res.status(400).send({error: error.message})
      })

      
    });

    //get encounter part node tree data
    app.get('/encounterpartnodetree/:encounterID', async(req, res, next) => {
      
      await pg.select('*').table('encounter_part').where({encounter_uuid: req.params.encounterID}).then(async (data) => {
        const main = [];
        const topLevel = data.filter(part => part.follows === null);
        const nodeSvgShape = {
          shape: 'rect',
          shapeProps: {
            width:15,
            height:10,
            x:-7.5,
            y:-5,
            fill: '#888',
            strokeWidth:0
          }
        };

        topLevel.forEach(child => {
          main.push(this.findChilds(child.uuid, data, {name: '', id: child.uuid, nodeSvgShape, attributes: {}, children: []}));
        });

        res.status(200).send(main);

      });
    });

  }
  
  findChilds(parentUUID, total, obj) {
    const newObj = [];
    const curChildren = total.filter(child => child.follows === parentUUID);
    const nodeSvgShape = {
      shape: 'rect',
      shapeProps: {
        width:15,
        height:10,
        x:-7.5,
        y:-5,
        fill: '#888',
        strokeWidth:0
      }
    };

    if(curChildren.length > 0) {
      curChildren.forEach(child => {
        newObj.push(this.findChilds(child.uuid, total, {name: '', id: child.uuid, nodeSvgShape, attributes: {}, children: []}));
      });
      obj.children = newObj;
    }
  
    return obj;
  }

}

module.exports = Story;