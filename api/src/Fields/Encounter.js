const uuidV1 = require('uuid/v1');


class Story {

  constructor( app, pg ) {

    app.get('/encounter/:uuid', async(req, res, next) => {
      pg.select('*').table('encounter').where({uuid: req.params.uuid}).then((data) => {
        res.status(200).send(data[0]);
      }).catch((error) => {
        res.send(400, error);
      });
    });
    

    app.get('/encounterparts/:uuid', async(req, res, next) => {
      pg.select('*').table('encounter_part').where({encounter_uuid: req.params.uuid}).then((data) => {
        res.status(200).send( data);
      });
    });


    app.post('/encounterpart', async(req, res, next) => {
      const data = {
        uuid: uuidV1(),
        cta: req.body.cta,
        follows: req.body.follows,
        story_text: req.body.story_text,
        encounter_uuid: req.body.encounter_uuid
      }
      pg.insert(data).table('encounter_part').returning([ 'uuid', 'cta', 'follows' ]).then((data) => {
        res.send(200, data);
      });
    });

    app.get('/encounter/story/:uuid', async(req, res, next) => {
      pg.select('*').table('encounter').where({story_uuid: req.params.uuid}).then((data) => {
        res.status(200).send(data);
      });
    });


    app.post('/encounter', async(req, res, next) => {
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
        res.send(400, { message: error });
      });
      
    });

    app.post('/encounterpartnodetree', async(req, res, next) => {
      await pg.select('*').table('encounter_part').where({encounter_uuid: req.body.encounter_uuid}).then(async (data) => {
        const main = [{ name: '', attributes: {}, children: []}];
        const topLevel = data.filter(part => part.follows === null);
        console.log('data',req.body)

        topLevel.forEach(child => {
          if(child.uuid === req.body.encounterPart_uuid) {
            console.log('hit')
            main[0].children.push(this.findChilds(
              child.uuid, 
              data, 
              {name: '', attributes: {}, nodeSvgShape: { shape: 'rect', shapeProps: { fill: 'blue', width: 15, height: 10, x:-7.5, y:-5, fill: '#37d498', strokeWidth:0 }}, children: []}, 
              req.body.encounterPart_uuid
            ));
          } else {
            main[0].children.push(this.findChilds(
              child.uuid, 
              data, 
              {name: '', attributes: {}, children: []}, 
              req.body.encounterPart_uuid
            ));
          }
        });

        res.status(200).send(main);

      });
    });

  }
  
  findChilds(parentUUID, total, obj, currNodeUuid) {
    const newObj = [];
    const curChildren = total.filter(child => child.follows === parentUUID);

    if(curChildren.length > 0) {
      curChildren.forEach(child => {
        if(child.uuid === currNodeUuid) {
          newObj.push(
            this.findChilds(
              child.uuid, 
              total, 
              {name: '', attributes: {}, nodeSvgShape: { shapeProps: { fill: 'blue', width: 15, height: 10, x:-7.5, y:-5, fill: '#37d498', strokeWidth:0 }}, children: []}, 
              currNodeUuid
            ));
        } else {
          newObj.push(
            this.findChilds(
              child.uuid, 
              total, 
              {name: '', attributes: {}, children: []}, currNodeUuid
            ));
        }
      });

      obj.children = newObj;

    }
  
    return obj;
  }
}

module.exports = Story;