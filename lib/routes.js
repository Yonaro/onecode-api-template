// lib/routes.js
var example = require("./api/example");



module.exports = [

  {
    method: "POST",
    path: "/api/login",
    options: {
      cors: true,
      handler: auth.api.login
    }
  },
  {
    method: "GET",
    path: "/api",
    options: {
      cors: true,
      handler: function () {
        return "API V1.0.0";
      }
    }
  }
].concat(
  example
);
