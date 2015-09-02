var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'jadeangularexpress'
    },
    port: 3000,
    db: 'mongodb://localhost/jadeangularexpress-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'jadeangularexpress'
    },
    port: 3000,
    db: 'mongodb://localhost/jadeangularexpress-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'jadeangularexpress'
    },
    port: 3000,
    db: 'mongodb://localhost/jadeangularexpress-production'
  }
};

module.exports = config[env];
