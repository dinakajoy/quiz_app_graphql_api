import type { NextApiRequest, NextApiResponse } from "next";
import Cors from 'nextjs-cors';
import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../../db/graphql/quiz.types";
import resolvers from "../../db/graphql/quiz.resolvers";
import connectDB from '../../db/dbConnect';

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const startServer = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await Cors(req, res, {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: 'https://quiz-app-graphql-api.vercel.app',
    optionsSuccessStatus: 200,
  });

  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  connectDB();
  await startServer

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
}