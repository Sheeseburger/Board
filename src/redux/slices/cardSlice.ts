import {ADD_CARD, MOVE_CARD, REMOVE_CARD, UPDATE_CARD} from '../actions/cardActions';
import {ICard} from '../../interfaces/ICard';
export const addCard = (card: ICard, columnId: string) => {
  return {
    type: ADD_CARD,
    payload: {card, columnId}
  };
};

export const moveCard = (cardId: string, destinationColumnId: string, sourceColumnId: string) => {
  return {
    type: MOVE_CARD,
    payload: {cardId, destinationColumnId, sourceColumnId}
  };
};

export const removeCard = (cardId: string, columnId: string) => {
  return {
    type: REMOVE_CARD,
    payload: {cardId, columnId}
  };
};
export const updateCard = (card: ICard, columnId: string) => {
  return {
    type: UPDATE_CARD,
    payload: {card, columnId}
  };
};
