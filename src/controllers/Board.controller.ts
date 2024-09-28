import {Request, Response} from 'express';
import Board from '../models/Board.model';
import catchAsync from '../utils/catchAsync';

export const createBoard = catchAsync(async (req: Request, res: Response) => {
  const {name} = req.body;

  const newBoard = new Board({name});
  await newBoard.save();

  return res.status(201).json(newBoard);
});

export const getAllBoards = catchAsync(async (req: Request, res: Response) => {
  const boards = await Board.find();
  return res.status(200).json(boards);
});

export const getBoardById = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const board = await Board.findById(id);

  if (!board) {
    return res.status(404).json({message: 'Board not found :('});
  }

  return res.status(200).json(board);
});

export const updateBoard = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {name} = req.body;

  const updatedBoard = await Board.findByIdAndUpdate(id, {name}, {new: true, runValidators: true});

  if (!updatedBoard) {
    return res.status(404).json({message: 'Board not found :('});
  }

  return res.status(200).json(updatedBoard);
});

export const deleteBoard = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const deletedBoard = await Board.findByIdAndDelete(id);

  if (!deletedBoard) {
    return res.status(404).json({message: 'Board not found :('});
  }

  return res.status(200).json({message: 'Board deleted successfully :)'});
});
