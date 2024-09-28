import {Types, Document} from 'mongoose';
import {ICard} from './ICard';

export interface IColumn extends Document {
  _id: Types.ObjectId;
  name: string;
  cards: ICard[];
  isDeletable: boolean;
}
