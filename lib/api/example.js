var models = require("../../models");

var all = function() {
  return models.tbl_school
    .findAll({
      include: [models.tbl_sys_schooltype]
    })
    .then(function(obj) {
      return obj;
    });
};

var create = function() {
  console.log(request.payload);
  return models.tbl_school.create(request.payload).then(function(obj) {
    console.log(obj);
    console.log("We have a persisted instance now");
    return {
      success: true,
      msg: "New record created",
      data: obj
    };
  });
};

var update = function() {
  // filter out the needed record
  //create the hours entry for ch day entered .add(7, 'days')
  return models.tbl_school
    .find({
      where: {
        id: request.params.id
      }
    })
    .then(function(result) {
      //console.log(entrysheet_items);
      if (!result) {
        console.log('{"failure" :true,"message":"tbl_school not updated!"}');

        return {
          success: false,
          msg: "Record not updated!",
          data: {}
        };
      } else {
        return result.update(request.payload).then(function() {
          console.log('{"success" :true,"message":"tbl_school updated!"}');

          return {
            success: true,
            msg: "Record updated!",
            data: {}
          };
        });
      }
    });
};

var single = function() {
  var id = request.params.id ? request.params.id : 0;

  return models.tbl_school
    .findAll({
      where: {
        id: id
      }
    })
    .then(function(obj) {
      if (obj.length > 0) {
        return obj[0];
      } else {
        return {};
      }
    });
};

module.exports = [
  {
    method: "POST",
    path: "/childcare/api/schools/update/{id}",
    options: {
      cors: true,
      handler: update
    }
  },
  {
    method: "POST",
    path: "/childcare/api/schools/create",
    options: {
      cors: true,
      handler: create
    }
  },
  {
    method: "GET",
    path: "/childcare/api/schools",
    options: {
      cors: true,
      handler: all
    }
  },
  {
    method: "GET",
    path: "/childcare/api/schools/{id}",
    options: {
      cors: true,
      handler: single
    }
  }
];
