(function() {
  var _, createArgs, getFlag;

  _ = require('lodash');

  createArgs = function(options) {
    var thriftOpts;
    thriftOpts = {
      version: null,
      I: null,
      nowarn: null,
      strict: null,
      verbose: null,
      recurse: null,
      allowNegKeys: null,
      allow64bitConsts: null,
      gen: null,
      out: null
    };
    _.extend(thriftOpts, _.pick(options, Object.keys(thriftOpts)));
    return _.reduce(thriftOpts, function(str, value, key) {
      if (value != null) {
        str += getFlag(key, value);
      }
      return str;
    }, "");
  };

  getFlag = function(key, value) {
    var flagMap;
    flagMap = {
      "allowNegKeys": function() {
        return "--allow-neg-keys " + value + " ";
      },
      "allow64BitConsts": function() {
        return "--allow-64bit-consts " + value + " ";
      },
      "gen": function() {
        return "--gen " + value + " ";
      },
      "I": function() {
        return _.reduce(value, function(string, dir) {
          return string += "-I " + dir + " ";
        }, "");
      }
    };
    if (flagMap[key]) {
      return flagMap[key]();
    } else {
      if (_.isBoolean(value)) {
        return "-" + key + " ";
      } else {
        return "-" + key + " " + value + " ";
      }
    }
  };

  module.exports = createArgs;

}).call(this);
