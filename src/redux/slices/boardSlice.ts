import {IBoard} from '../../interfaces/IBoard';
import {ADD_BOARD, OPEN_BOARD} from '../actions/boardActions';

export const openBoard = (board: IBoard) => {
  return {
    type: OPEN_BOARD,
    payload: board
  };
};
