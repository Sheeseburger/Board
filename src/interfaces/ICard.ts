import {Types, Document} from 'mongoose';

export interface ICard extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
}
