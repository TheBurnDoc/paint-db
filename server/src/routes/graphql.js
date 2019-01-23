var graphql = require('express-graphql');
var config = require('../config');

module.exports = function(app, schema) {
  const rootUri = `http://${config.hostname}:${config.port}`;

  app.use(config.graphQLRoot,

    // Attach viewer to GraphQL context
    graphql({
      schema: schema,
      graphiql: config.graphiQL,
    })
  );

  console.log(`GraphQL served from endpoint "${rootUri}${config.graphQLRoot}"`);
};
