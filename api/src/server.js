const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuidV1 = require('uuid/v1');
const faker = require("faker");


const app = express();
const server = http.Server(app);
const PORT = 3000;

const UserApp = require('./Fields/User/User.js')

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

    app.get('/', async (req, res, next) => {
      const result = {};

      res.send(result)
    })

    new UserApp( app );


    server.listen(PORT, () => {
      console.log(`server up and listening on ${PORT}`)
    })

  }

  async initialiseTables() {

    // await this.pg.schema.dropTableIfExists('users').then(console.log("dropped users"));
    // await this.pg.schema.dropTableIfExists('character').then(console.log("dropped character"));
    // await this.pg.schema.dropTableIfExists('tokens').then(console.log("dropped tokens"));
    // await this.pg.schema.dropTableIfExists('encounter').then(console.log("dropped encounter"));
    // await this.pg.schema.dropTableIfExists('encounter_part').then(console.log("dropped encounter part"));
    // await this.pg.schema.dropTableIfExists('encounter_action').then(console.log("dropped encounter action"));
    // await this.pg.schema.dropTableIfExists('combat').then(console.log("dropped combat"));
    // await this.pg.schema.dropTableIfExists('combat_part').then(console.log("dropped combat part"));

    await this.pg.schema.createTableIfNotExists('users', function (table) {
      table.increments();
      table.uuid("uuid");
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.string("usermail");
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

    await this.pg.schema.createTableIfNotExists('encounter', function (table){
      table.increments();
      table.uuid("uuid");
      table.string("character_uuid");
      table.string("description");
      table.string("start_part_uuid");
      table.timestamps(true, true);
    }).then(function () {
      console.log("created Encounter");
    });

    await this.pg.schema.createTableIfNotExists('encounter_part', function (table){
      table.increments();
      table.uuid("uuid");
      table.string("encounter_uuid");
      table.string("story_text");
      table.string("description");
      table.string("combat_uuid");
      table.string("encounter_part_uuid");
      table.timestamps(true, true);
    }).then(function () {
      console.log("created encounter part");
    });

    await this.pg.schema.createTableIfNotExists('encounter_action', function (table){
      table.increments();
      table.uuid("uuid");
      table.string("encounter_part_uuid");
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
      table.string("start_part_uuid");
      table.timestamps(true, true);
    }).then(function () {
      console.log("created combat");
    });

    await this.pg.schema.createTableIfNotExists('combat_part', function (table){
      table.increments();
      table.uuid("uuid");
      table.string("story_text");
      table.string("description");
      table.string("combat_part_uuid");
      table.string("encounter_uuid");
      table.timestamps(true, true);
    }).then(function () {
      console.log("created combat part");
    });
    
  }
}
module.exports = App;
