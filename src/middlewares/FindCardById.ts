import {Response, NextFunction} from 'express';
import {IColumn} from '../interfaces/IColumn';
import {ExtendedRequest} from '../types/ExtendedRequest';
import catchAsync from '../utils/catchAsync';

export const findCardById = catchAsync(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const column: IColumn = req.column!;
    const {cardId} = req.params;

    const card = column.cards.find(card => card._id.toString() === cardId);

    if (!card) {
      return res.status(404).json({message: 'Card not found'});
    }

    req.card = card;
    next();
  }
);
