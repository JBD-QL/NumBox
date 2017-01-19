import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull
} from 'graphql';

const NumBoxModel = require('./models/numBoxModel');

const numBoxType = new GraphQLObjectType({
  name: 'Nums',
  fields: {
    box1: { type: GraphQLInt},
    box2: { type: GraphQLInt},
    box3: { type: GraphQLInt},
    box4: { type: GraphQLInt}
  }
});

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    getNums: {
      type: numBoxType,
      args: {},
      resolve: function(root, params, options) {
        return NumBoxModel.findOne({});
      }
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    saveNums: {
      type: numBoxType,
      args: {
        box1: { type: new GraphQLNonNull(GraphQLInt)},
        box2: { type: new GraphQLNonNull(GraphQLInt)},
        box3: { type: new GraphQLNonNull(GraphQLInt)},
        box4: { type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve: function(root, args, options) {
        let numBox = Object.assign({}, args);
        NumBoxModel.remove({}, (err) => {
          if (err) {
            res.statusCode = 400;
            return res.send(err);
          }
        });
        return NumBoxModel.create(numBox);
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = Schema;