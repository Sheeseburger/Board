import {ADD_CARD} from '../actions/cardActions';
import {ICard} from '../../interfaces/ICard';
export const addCard = (card: ICard, columnId: string) => {
  return {
    type: ADD_CARD,
    payload: {card, columnId}
  };
};
