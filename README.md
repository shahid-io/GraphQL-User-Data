# GraphQL with ApolloServer

- To setup the project
  `npm init`

- Set up `.env` and `server-config.js`

```
PORT=3003
```

- `config/server-config.js`

```
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  PORT: process.env.PORT,
};

```

- Run the project
`npm run dev`
