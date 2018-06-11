# Fauna
## Setup

```
$ cp .env.template .env
$ npm install
```


## Development

```
$ npm run start:dev
```

## Production

```
$ npm run start:prod
```

# The Fauna API
The Fauna API provides programmatic access to all stories created on the Fauna platform. Version 1 of the API is limited to the essentials, you can get all the sotries, encounters and encounter parts.

The API is a REST API. Currently, return format for all endpoints is JSON.

## Accessing the story
You can write a story on the platform. While writing the stories you will see the uuid's of the stories, encounters and encounter parts you are writing. You can copy these uuids and use them to get the stories from the API. 

##Endpoints
GET encounter/:uuid
  - Get encounter data

GET encounterpart/:uuid
  - Get encounterpart data 

GET encounter/story/:uuid
  - Get encounter list

GET encounterparts/:uuid
  - Get encounterpart list

GET encounterpartnodetree/:encounterID
  - Get encounter part node tree data

GET story
  - Get story list

GET story/:uuid
  - Get story data

##FAQ

- What kind of authentication is required?

The API does not require authentication. You can access all stories without any authentication, but there is only read access. To write stories access to the platform is required. Login and registration can be found at this link: http://localhost:9000/login

- What return formats do you support? 

Currently the API only returns data in JSON format


