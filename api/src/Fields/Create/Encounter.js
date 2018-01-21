class Login {

  constructor( app, pg ) {
    app.post('/Encounter', async(req, res, next) => {
      const results = [];
      const data = {uuid: req.body.uuid};

      res.sendStatus(200);
      
    })

    app.get('/Encounter', async(req, res, next) => {
      const results = [];

      app.connect(connectionstring, (err, client, done) => {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({success: false, data: err});
        }

        const query = client.query('SELECT * FROM encounter ORDER BY id ASC');

        query.on('row', (row) => {
          results.push(row);
        });

        query.on('end', () => {
          done();
          return res.json(results);
        });

      });

    });
  }
}

module.exports = Login;