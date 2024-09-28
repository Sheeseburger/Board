import {ICard} from './ICard';

export interface IColumn {
  _id: string;
  name: string;
  cards: ICard[];
  isDeletable: boolean;
}
