const uuidV1 = require('uuid/v1');
const { requiresLogin } = require('./../Utils/Auth')


class Story {

  constructor( app, pp, pg) {

    app.get('/encounter/:uuid', async(req, res, next) => {
      pg.select('*').table('encounter').where({uuid: req.params.uuid}).then((data) => {
        res.status(200).send(data[0]);
      }).catch((error) => {
        res.status(400).send(error);
      });
    });

    app.get('/encounterpart/:uuid', async(req, res, next) => {
      pg.select('*').table('encounter_part').where({uuid: req.params.uuid}).then((data) => {
        res.status(200).send(data[0]);
      }).catch((error) => {
        res.status(400).send(error);
      });
    });

    app.get('/encounterparts/:uuid', async(req, res, next) => {
      pg.select('*').table('encounter_part').where({encounter_uuid: req.params.uuid}).then((data) => {
        res.status(200).send(data);
      });
    });

    app.post('/encounterpart', requiresLogin, async(req, res, next) => {
      const data = {
        uuid: uuidV1(),
        cta: req.body.cta,
        follows: req.body.follows,
        story_text: req.body.story_text,
        encounter_uuid: req.body.encounter_uuid
      }
      pg.insert(data).table('encounter_part').returning([ 'uuid', 'cta', 'follows', 'encounter_uuid' ]).then((data) => {
        res.status(200).send(data);
      });
    });

    app.get('/encounter/story/:uuid', async(req, res, next) => {
      pg.select('*').table('encounter').where({story_uuid: req.params.uuid}).then((data) => {
        res.status(200).send(data);
      });
    });


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
        .insert({story_text: req.body.start, encounter_uuid: toInsert.uuid, uuid: eUuid})
        .table('encounter_part')
        .returning(["uuid", "story_text", "follows", "cta"])
        .then((encounterPart) => {
          pg
          .update({start_encounter_part_uuid: eUuid})
          .table('encounter')
          .where({ uuid: toInsert.uuid})
          .returning(["uuid", "character_uuid", "description", "story_uuid"])
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