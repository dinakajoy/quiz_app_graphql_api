import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  type QuizItem {
    _id: ID
    question: String
    options: [String]
    answer: String
  }

  type Query {
    quizPaginated(idx: Int): QuizItem
    quiz: [QuizItem]
  }
`;

export default typeDefs;
