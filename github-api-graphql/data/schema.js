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

import axios from 'axios';

const query = new GraphQLObjectType({
  name: "Query",
  description: "GraphQL Server Config",
  fields: () => ({
    gitHubUser: {
      type: UserInfoType,
      description: "GitHub user API data with additional data",
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString),
          description: "GitHub username you want information of",
        }
      },
      resolve: (_,{username}) => {
        const url = `https://api.github.com/users/${username}`;
        return axios.get(url)
          .then( (res) => {
            return res.data;
          });
      }
    },
  })
});

const UserInfoType = new GraphQLObjectType({
  name: "UserInfo",
  description: "GitHub user basic information",
  fields: () => ({
    "login": {type: GraphQLString},
    "id": {type: GraphQLInt},
    "name": {type: GraphQLString},
    "location": {type: GraphQLString},
    "email": {type: GraphQLString},
    "hireable": {type: GraphQLBoolean},
    "following_url": {
       type: GraphQLString,
       resolve: (obj) => {
         const brackIndex = obj.following_url.indexOf("{");
         return obj.following_url.slice(0, brackIndex);
       }
     },
   })
})

const schema = new GraphQLSchema({
  query
});

export default schema;
