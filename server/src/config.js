var config = require('12factor-config');
const envPrefix = 'PAINT_DB';
const nodeEnv = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';

module.exports = config({
  port: {
    env      : `${envPrefix}_PORT`,
    type     : 'integer',
    default  : '4000',
  },
  hostname: {
    env      : `${envPrefix}_HOSTNAME`,
    type     : 'string',
    default  : 'localhost',
  },
  secret: {
    env      : `${envPrefix}_SECRET`,
    type     : 'string',
    default  : 'secret',
  },
  saltWorkFactor: {
    env      : `${envPrefix}_SALT_WORK_FACTOR`,
    type     : 'integer',
    default  : 10,
  },
  clientRoot: {
    env      : `${envPrefix}_CLIENT_ROOT`,
    type     : 'string',
    default  : '/',
  },
  clientDir: {
    env      : `${envPrefix}_CLIENT_DIR`,
    type     : 'string',
    default  : 'public',
  },
  clientIndex: {
    env      : `${envPrefix}_CLIENT_INDEX`,
    type     : 'string',
    default  : 'index.html',
  },
  graphQLRoot: {
    env      : `${envPrefix}_GRAPHQL_ROOT`,
    type     : 'string',
    default  : '/graphql',
  },
  mongoUri: {
    env      : `${envPrefix}_MONGO_URI`,
    type     : 'string',
    default  : 'mongodb://root:password@localhost:27017/hobby?authSource=admin',
  },

  // Development options
  graphiQL: {
    env      : `${envPrefix}_GRAPHIQL`,
    type     : 'boolean',
    default  : (nodeEnv === 'development'),
  },
  devServer: {
    env      : `${envPrefix}_DEV_SERVER`,
    type     : 'boolean',
    default  : (nodeEnv === 'development'),
  },
  devServerConfig: {
    env      : `${envPrefix}_DEV_SERVER_CONFIG`,
    type     : 'string',
    default  : 'webpack.config.js',
  },
  devServerColour: {
    env      : `${envPrefix}_DEV_SERVER_COLOUR`,
    type     : 'boolean',
    default  : false,
  },
});
