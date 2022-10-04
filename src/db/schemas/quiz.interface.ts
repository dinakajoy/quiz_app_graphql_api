import { Types, Document, Model } from 'mongoose';

export interface IQuizSchema {
  question: string;
  options: string[];
  answer: string;
}

export interface IQuizSchemaDocument extends IQuizSchema, Document {
  _id: Types.ObjectId;
}

export type IQuizModel = Model<IQuizSchemaDocument>;