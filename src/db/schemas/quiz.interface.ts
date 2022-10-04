import { Types, Document, Model } from 'mongoose';

export interface IQuizSchema {
  question: string;
  options: string[];
  answer: string;
}

// export type TQuizSchema = {
//   _id: Types.ObjectId;
//   question: string;
//   options: string[];
//   answer: string;
// }

// export type TQuizResponse = {
//   prev: boolean, 
//   next: boolean, 
//   page: number, 
//   quiz: TQuizSchema, 
//   total: number 
// }

export interface IQuizSchemaDocument extends IQuizSchema, Document {
  _id: Types.ObjectId;
}

export type IQuizModel = Model<IQuizSchemaDocument>;