import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { sequelize } from './database';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolver';
import { authMiddleware } from './middleware/auth';
import { Request } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express() as any;

const port = process.env.PORT || 5432;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: { req: Request }) => authMiddleware(req),
});

server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/graphql`);
    sequelize.authenticate().then(() => {
      console.log('Database connected!');
    }).catch((e: any) => {
      console.log(e.massage)
    })
  });
});
