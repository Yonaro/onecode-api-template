'use strict';

const Hapi = require('hapi');
const models = require('./models');

// create the server

const server = new Hapi.Server({
  port: ~~process.env.PORT || 8777,
  debug: {
    request: ['error']
  }
});


// async function Init() {
//   await server.register(
//     register: require('hapi-cors'),
//     options: {
//       origins: ['*'],
//       allowCredentials: 'true',
//       exposeHeaders: ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"],
//       maxAge: 600,
//       methods: ['POST, GET, PUT, OPTIONS'],
//       headers: ['Access-Control-Request-Method', 'Access-Control-Request-Headers', 'Accept-Encoding', 'Accept-Language', 'Accept', 'Content-Type', 'Authorization', 'Access-Control-Allow-Origin']
//     }
//   });
// }

// Init();

server.ext('onRequest', (request, h) => {
  console.log('Request received: ' + request.method + ' - ' + request.path);
  return h.continue;
});


//API routes...
server.route(require('./lib/routes'));


models.sequelize.sync().then(function () {
server
  .start()
  .then(() => {
    console.log(`Server running at: ${server.info.uri}`);
  }) // if needed
  .catch(err => {
    console.log(err)
  })



});
