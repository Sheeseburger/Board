import {IBoard} from '../../interfaces/IBoard';
import {OPEN_BOARD} from '../actions/boardActions';

export const openBoard = (board: IBoard) => {
  return {
    type: OPEN_BOARD,
    payload: board
  };
};
