import { getQuizes, getQuizPaginated } from './quiz.processors';

const resolvers = {
  Query: {
    quiz: () => getQuizes(),
    quizPaginated: async (_: any, { idx }: any) => await getQuizPaginated(idx)
  },
};

export default resolvers
