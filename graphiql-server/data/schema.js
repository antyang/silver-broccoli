import {
 GraphQLSchema,
 GraphQLObjectType,
 GraphQLInt,
 GraphQLString,
 GraphQLList,
 GraphQLNonNull,
 GraphQLID,
 GraphQLBoolean,
 GraphQLFloat
} from 'graphql';


const query = new GraphQLObjectType({
  name: "Query",
  description: "GraphQL Server Config",
  fields: () => ({
    hello: {
      type: GraphQLString,
      description: "Accepts a name so you can say hi",
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
          description: "Name you want to say hi to",
        }
      },
      resolve: (_,args) => {
        return `Hello, ${args.name}!!!`;
      }
    },
    luckyNumber: {
      type: GraphQLInt,
      description: "A lucky number",
      resolve: () => {
        return 888;
      }
    },
    randomNumber: {
      type: GraphQLInt,
      description: "A random number",
      resolve: () => {
        return Math.random()*10;
      }
    }
  })
});

const schema = new GraphQLSchema({
  query
});

export default schema;
