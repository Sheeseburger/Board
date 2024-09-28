import {Request, Response, NextFunction} from 'express';
import Board from '../models/Board.model';
import Column from '../models/Column.model';
import {ExtendedRequest} from '../types/ExtendedRequest';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';

// Create a new column
export const createColumn = catchAsync(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const board = req.board!;
    const {name} = req.body;

    const newColumn = new Column({
      _id: new mongoose.Types.ObjectId(),
      name,
      cards: [],
      isDeletable: true
    });

    board.columns.push(newColumn);
    await board.save();

    res.status(201).json(newColumn);
  }
);

export const deleteColumn = catchAsync(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const {columnId} = req.params;
    const board = req.board!;

    const column = req.column!;

    if (!column.isDeletable) {
      return res.status(403).json({message: 'Column is not deletable'});
    }

    board.columns = board.columns.filter(col => col._id.toString() !== columnId);
    await board.save();

    res.status(204).send();
  }
);
