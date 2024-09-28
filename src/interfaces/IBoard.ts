import {Types, Document} from 'mongoose';

import {IColumn} from './IColumn';

export interface IBoard extends Document {
  _id: Types.ObjectId;
  name: string;
  columns: IColumn[];
}
