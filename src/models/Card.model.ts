import mongoose, {Schema} from 'mongoose';
import {ICard} from '../interfaces/ICard';

const CardSchema = new Schema<ICard>(
  {
    _id: {type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId()},
    title: {type: String, required: true},
    description: {type: String, required: true}
  },
  {timestamps: true}
);
const Card = mongoose.model<ICard>('Card', CardSchema);

export {CardSchema};
export default Card;
