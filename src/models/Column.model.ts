import mongoose, {Schema} from 'mongoose';
import {IColumn} from '../interfaces/IColumn';
import {CardSchema} from './Card.model';

const ColumnSchema = new Schema<IColumn>(
  {
    _id: {type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId()},
    name: {type: String, required: true, unique: true},
    cards: [CardSchema],
    isDeletable: {type: Boolean, default: true}
  },
  {timestamps: true}
);

const Column = mongoose.model<IColumn>('Column', ColumnSchema);

export {ColumnSchema};
export default Column;
