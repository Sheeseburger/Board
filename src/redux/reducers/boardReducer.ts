import {OPEN_BOARD} from '../actions/boardActions';
import {BoardState, BoardAction} from '../../interfaces/IBoard';
import {ADD_CARD, MOVE_CARD, REMOVE_CARD, UPDATE_CARD} from '../actions/cardActions';

const initialState: BoardState = {
  selectedBoard: null
};

export const boardReducer = (state = initialState, action: BoardAction): BoardState => {
  switch (action.type) {
    case OPEN_BOARD:
      return {
        ...state,
        selectedBoard: action.payload
      };

    case REMOVE_CARD:
      if (!state.selectedBoard) return state;

      const {cardId, columnId: removeFromColumnId} = action.payload;

      const removeFromColumn = state.selectedBoard.columns.map(column => {
        if (column._id === removeFromColumnId) {
          return {
            ...column,
            cards: column.cards.filter(card => card._id !== cardId)
          };
        }
        return column;
      });

      return {
        ...state,
        selectedBoard: {
          ...state.selectedBoard,
          columns: removeFromColumn
        }
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

    case MOVE_CARD:
      if (!state.selectedBoard) return state;

      const {cardId: cardToMoveId, destinationColumnId, sourceColumnId} = action.payload;

      const newCols = state.selectedBoard.columns.map(column => {
        if (column._id === sourceColumnId) {
          const updatedCards = column.cards.filter(c => c._id !== cardToMoveId);
          return {...column, cards: updatedCards};
        }

        if (column._id === destinationColumnId) {
          const cardToMove = state.selectedBoard?.columns
            .find(col => col._id === sourceColumnId)
            ?.cards.find(c => c._id === cardToMoveId);

          if (cardToMove) {
            return {...column, cards: [...column.cards, cardToMove]};
          }
        }

        return column;
      });

      return {
        ...state,
        selectedBoard: {
          ...state.selectedBoard,
          columns: newCols
        }
      };
    case UPDATE_CARD:
      if (!state.selectedBoard) return state;

      const {card: updatedCard, columnId: updateColumnId} = action.payload;
      console.log(action.payload);
      const updatedCardColumns = state.selectedBoard.columns.map(column => {
        if (column._id === updateColumnId) {
          return {
            ...column,
            cards: column.cards.map(card => (card._id === updatedCard._id ? updatedCard : card))
          };
        }
        return column;
      });

      return {
        ...state,
        selectedBoard: {
          ...state.selectedBoard,
          columns: updatedCardColumns
        }
      };

    default:
      return state;
  }
};
