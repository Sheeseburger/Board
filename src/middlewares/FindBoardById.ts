import {Response, NextFunction} from 'express';
import Board from '../models/Board.model';
import catchAsync from '../utils/catchAsync';
import {ExtendedRequest} from '../types/ExtendedRequest';

export const findBoardById = catchAsync(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const {boardId} = req.params;

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({message: 'Board not found'});
    }

    req.board = board;
    next();
  }
);
