'use strict';
var Promise = require('bluebird');

// updates mongoDB's indexes to match model
module.exports = (server) => {
  Promise.each(server.models(), function (model) {
    if (model.dataSource) {
      var autoupdate = Promise.promisify(model.dataSource.autoupdate);
      if (autoupdate) {
        return autoupdate.call(model.dataSource, model.modelName);
      }
    }
  });
};
