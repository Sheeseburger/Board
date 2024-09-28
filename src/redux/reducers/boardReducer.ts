import {ADD_BOARD, OPEN_BOARD} from '../actions/boardActions';
import {BoardState, BoardAction} from '../../interfaces/IBoard';
import {ADD_CARD} from '../actions/cardActions';

const initialState: BoardState = {
  selectedBoard: null
};

export const boardReducer = (
  state = initialState,
  action: BoardAction
): BoardState => {
  switch (action.type) {
    case OPEN_BOARD:
      return {
        ...state,
        selectedBoard: action.payload
      };
    case ADD_CARD:
      if (!state.selectedBoard) return state;

      const {card, columnId} = action.payload;

      const updatedColumns = state.selectedBoard.columns.map(column => {
        if (column._id === columnId) {
          return {
            ...column,
            cards: [...column.cards, card]
          };
        }
        return column;
      });

      return {
        ...state,
        selectedBoard: {
          ...state.selectedBoard,
          columns: updatedColumns
        }
      };
    default:
      return state;
  }
};
