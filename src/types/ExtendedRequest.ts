import {Request} from 'express';

import {IBoard} from '../interfaces/IBoard';
import {IColumn} from '../interfaces/IColumn';
import {ICard} from '../interfaces/ICard';

export type ExtendedRequest = Request & {
  board?: IBoard;
  column?: IColumn;
  card?: ICard;
};
