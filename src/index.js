const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const { ServerConfig } = require("./config");
const userData = require("./resources/moc-data.json");
const app = express();

/*
 * By default ExpressJS doesnot know how to read the req.body.
 * U need to mention ExpressJS that in the incoming request,
 * if there is a `req.body` please read it like a JSON
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/**
 * graphQL : code
 */
const typeDefs = gql`
  type User {
    id: Int
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Query {
    getAllUsers(id: Int): [User]
    getUserById(id: ID): User
  }

  type Mutation {
    createUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
  }
`;

const resolvers = {
  Query: {
    getAllUsers: (parent, args) => {
      // if (args.id) {
      //   return userData.filter((user) => user.id === args.id);
      // }
      return userData;
    },
    // getUserById: (_, args) => userData.find((user) => user.id == args.id),
    getUserById: (_, {id}) => userData.find((user) => user.id == id),
  },
  Mutation: {
    createUser: (parent, args) => {
      const newUser = {
        id: userData.length + 1,
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        password: args.password,
      };
      userData.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
}

startApolloServer().then(() => {
  app.listen(ServerConfig.PORT, () =>
    console.log(
      `Server ready at http://localhost:${ServerConfig.PORT}${server.graphqlPath}`
    )
  );
});
/**
 * server code
 */
