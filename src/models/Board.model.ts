import mongoose, {Schema} from 'mongoose';
import {IBoard} from '../interfaces/IBoard';
import Column, {ColumnSchema} from './Column.model';

const BoardSchema = new Schema<IBoard>(
  {
    _id: {type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId()},
    name: {type: String, required: true},
    columns: [ColumnSchema] // Using ColumnSchema instead of the Column model
  },
  {
    timestamps: true
  }
);

const defaultCols = ['To Do', 'In Progress', 'Done'];
BoardSchema.pre('save', function (next) {
  if (this.isNew) {
    this.columns = defaultCols.map(
      name =>
        new Column({
          _id: new mongoose.Types.ObjectId(),
          name,
          cards: [],
          isDeletable: false
        })
    );
  }
  next();
});
const Board = mongoose.model<IBoard>('Board', BoardSchema);

export default Board;
