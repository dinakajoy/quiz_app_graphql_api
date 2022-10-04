import mongoose, { Schema } from 'mongoose';
import { IQuizSchemaDocument, IQuizModel } from './quiz.interface';
mongoose.Promise = global.Promise;

const QuizSchema: Schema = new Schema(
  {
    question: { type: String, default: '' },
    options: { type: Array, default: [] },
    answer: { type: String, default: '' },
  }
);

export default mongoose.models.Quiz as IQuizModel || mongoose.model<IQuizSchemaDocument, IQuizModel>('Quiz', QuizSchema);
