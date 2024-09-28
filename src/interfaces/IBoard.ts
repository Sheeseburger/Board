import {IColumn} from './IColumn';

export interface IBoard {
  _id: string;
  name: string;
  columns: IColumn[];
}

export interface BoardState {
  selectedBoard: IBoard | null;
}
export interface BoardAction {
  type: string;
  payload?: any;
}

export interface IBoardResponse {
  _id: string;
  name: string;
  columns: IColumn[];
}
