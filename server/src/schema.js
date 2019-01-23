var {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
  } = require('graphql');
  var {
    nodeDefinitions,
    fromGlobalId,
    globalIdField,
  } = require('graphql-relay');
  var Paint = require('./models/Paint');
  
  // Relay Node definitions
  var { nodeInterface, nodeField } = nodeDefinitions(globalId => {
    var { type, id } = fromGlobalId(globalId);
    if (type == 'Paint') return Paint.findById(id);
    else return null;
  }, obj => {
    if (obj.modelName == 'Paint') return paintType;
    else return null;
  });
  
  // Paint type
  var paintType = new GraphQLObjectType({
    name: Paint.modelName,
    description: 'A hobby paint',
    interfaces: [ nodeInterface ],
    fields: {
      id: globalIdField(),
      brand: {
        description: "The paint's brand",
        type: new GraphQLNonNull(GraphQLString),
      },
      line: {
        description: "The product line the paint belongs to",
        type: new GraphQLNonNull(GraphQLString),
      },
      tags: {
        description: "Tags associated with the paint",
        type: new GraphQLList(GraphQLString),
      },
      colours: {
        description: "Colours associated with the paint",
        type: new GraphQLList(GraphQLString),
      },
      quantity: {
        description: "The quanity of the paint possesed",
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
  });
  
  // Define the Query type
  var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      node: nodeField,
      paint: {
        type: new GraphQLList(paintType),
        description: "Paint root node",
        args: {
          id: {
            name: 'id',
            type: GraphQLInt
          }
        },
        resolve: (obj, { id }) => (id) ? [Paint.findById(id)] : Paint.find()
      },
    },
  });
  
  module.exports = new GraphQLSchema({
    query: queryType,
  });
  