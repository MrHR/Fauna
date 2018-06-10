const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuidV1 = require('uuid/v1');
const faker = require("faker");

const md5 = require('md5')
const passport = require("passport");
const LocalStrategy = require("passport-local");
const secret = "xxx";
const jwt = require("jwt-simple")

const app = express();
const server = http.Server(app);
const PORT = 3000;

const UserApp = require('./Fields/User/User.js')
const StoryApp = require('./Fields/Story.js');
const EncounterApp = require('./Fields/Encounter.js')

class App {

  constructor(opts) {

    this.pg = require('knex')({
      client: 'pg',
      connection: process.env.PG_CONNECTION_STRING,
      searchPath: 'knex,public'
    });

    const _this = this;

    this.pg.raw('select 1+1 as result').then(function () {
      _this.initialiseTables();
    });


    this.start = this.start.bind(this);

    this.app = express();
    this.s = http.Server(this.app);
  }

  async start() {

    app.use( bodyParser.json() );       // to support JSON-encoded bodies

    app.use(cors({credentials: false, origin: '*'}))

    app.use(passport.initialize()); 
    app.use(passport.session())
    app.get('/', async (req, res, next) => {
      const result = {};

      res.send(result)
    })

    passport.use(new LocalStrategy((email, password, cb) => {
      console.error("trying", email, password);
      this.pg.select(['email', 'password', 'uuid', 'first_name', 'last_name']).table('users').where('email', email).then(async (result) => {
        if(result.length > 0) {
          console.log(result[0].password, md5(password))
          if(result[0].password === md5(password)){
            const first = result[0];
            cb(null, jwt.encode({ id: first.uuid, email: first.email, first_name: first.first_name, last_name: first.last_name}, secret))
          } else {
            console.log('no match')
            cb(null, false);
          }
         } else {
          console.log('no result')
           cb(null, false)
         }
      }).catch((error) => {
        console.log('db error', error)
        cb(null, false)
      })
    }))
    passport.serializeUser((user, done) => {
      console.log(user)
      const sessionUser = jwt.encode({ id: user.id, email: user.email }, secret);
      done(null, sessionUser)
    })

    passport.deserializeUser((id, cb) => {
      console.log('deserialising', id)
      const user = jwt.decode(id, secret)
      this.pg.select('*').table('users').where({uuid: id.uuid}).then((results) => {
        cb(null, results[0])
      })
    })

    new UserApp( app, passport, this.pg );
    new StoryApp(app, passport, this.pg)
    new EncounterApp(app, passport, this.pg)

    server.listen(PORT, () => {
      console.log(`server up and listening on ${PORT}`)
    })

  }

  async initialiseTables() {

    //await this.pg.schema.dropTableIfExists('users').then(console.log("dropped users"));
    //await this.pg.schema.dropTableIfExists('character').then(console.log("dropped character"));
    //await this.pg.schema.dropTableIfExists('tokens').then(console.log("dropped tokens"));
    // await this.pg.schema.dropTableIfExists('encounter').then(console.log("dropped encounter"));
    // await this.pg.schema.dropTableIfExists('encounter_part').then(console.log("dropped encounter part"));
    // await this.pg.schema.dropTableIfExists('encounter_action').then(console.log("dropped encounter action"));
    // await this.pg.schema.dropTableIfExists('combat').then(console.log("dropped combat"));
    // await this.pg.schema.dropTableIfExists('combat_part').then(console.log("dropped combat part"));

    await this.pg.schema.createTableIfNotExists('users', function (table) {
      table.increments();
      table.uuid("uuid");
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.string("first_name");
      table.string("last_name");
      table.timestamps(true, true);
    }).then(function() {
      console.log("created users")
    });

    // await this.pg.schema.createTableIfNotExists('tokens', function (table) {
    //   table.increments();
    //   table.timestamps(true, true);
    //   table.uuid("user");
    //   table.string("token");
    //   table.dateTime("expires_on");
    // }).then(function() {
    //   console.log("created tokens")
    // });

    await this.pg.schema.createTableIfNotExists('character', function (table){
      table.increments();
      table.uuid("uuid");
      table.string("attack");
      table.string("hp");
      table.string("defense");
      table.string("image_uuid");
      table.string("weapons");
      table.timestamps(true, true);
    }).then(function () {
      console.log("created character");
    });


    await this.pg.schema.createTableIfNotExists('story', function (table){
      table.increments();
      table.uuid("uuid");
      table.string("title");
      table.string("character_uuid");
      table.string("description");
      table.uuid("start_part_uuid");
      table.timestamps(true, true);
    }).then(function () {
      console.log("created Story");
    });

    await this.pg.schema.createTableIfNotExists('encounter', function (table){
      table.increments();
      table.uuid("uuid");
      table.uuid("story_uuid");
      table.string("character_uuid");
      table.string("description");
      table.uuid("start_encounter_part_uuid");
      table.timestamps(true, true);
    }).then(function () {
      console.log("created Encounter");
    });

    await this.pg.schema.createTableIfNotExists('encounter_part', function (table){
      table.increments();
      table.uuid("uuid");
      table.uuid("encounter_uuid");
      table.text("story_text", "longtext");
      table.string("follows");
      table.string("cta");
      table.timestamps(true, true);
    }).then(function () {
      console.log("created encounter part");
    });


    await this.pg.schema.createTableIfNotExists('encounter_action', function (table){
      table.increments();
      table.uuid("uuid");
      table.uuid("encounter_part_uuid");
      table.string("start_uuid");
      table.string("story_text");
      table.timestamps(true, true);
    }).then(function () {
      console.log("created encounter action");
    });

    await this.pg.schema.createTableIfNotExists('combat', function (table){
      table.increments();
      table.uuid("uuid");
      table.string("character_uuid");
      table.string("description");
      table.uuid("start_part_uuid");
      table.timestamps(true, true);
    }).then(function () {
      console.log("created combat");
    });

    await this.pg.schema.createTableIfNotExists('combat_part', function (table){
      table.increments();
      table.uuid("uuid");
      table.string("story_text");
      table.string("description");
      table.uuid("combat_part_uuid");
      table.uuid("encounter_uuid");
      table.timestamps(true, true);
    }).then(function () {
      console.log("created combat part");
    });
    
  }
}
module.exports = App;
