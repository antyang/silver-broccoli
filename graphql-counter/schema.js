// schema.js
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt
} from 'graphql/type';

let count = 0;

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      count: {
        type: GraphQLInt,
				description: 'da count',
        resolve: function() {
          return count;
        }
      }
    }
  }),
	mutation: new GraphQLObjectType({
		name: 'RootMutationType',
		fields: {
			updateCount: {
				type: GraphQLInt,
				description: 'Updates the count',
				resolve: function() {
					count += 1;
					return count;
				}
			}
		}
	})
});

export default schema;

/**
basically saying:
My top-level query object retuns a `RootQueryType` object
which has a `count` field, which is an integer.
*/
