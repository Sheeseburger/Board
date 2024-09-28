import {Response, NextFunction} from 'express';
import {IBoard} from '../interfaces/IBoard';
import {ExtendedRequest} from '../types/ExtendedRequest';
import catchAsync from '../utils/catchAsync';

export const findColumnFromBoard = catchAsync(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const {columnId} = req.params;
    const board: IBoard = req.board!;

    const column = board.columns.find(col => col._id.toString() === columnId);

    if (!column) {
      return res.status(404).json({message: 'Column not found'});
    }

    req.column = column;
    next();
  }
);
