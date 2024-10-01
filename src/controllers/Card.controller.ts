import {Response} from 'express';
import catchAsync from '../utils/catchAsync';
import Card from '../models/Card.model';
import {ExtendedRequest} from '../types/ExtendedRequest';

export const createCard = catchAsync(async (req: ExtendedRequest, res: Response) => {
  const {title, description} = req.body;
  const board = req.board!;
  const column = req.column!;

  const newCard = new Card({title, description});
  await newCard.save();

  column.cards.push(newCard);

  await board.save();
  return res.status(201).json(newCard);
});

export const moveCard = catchAsync(async (req: ExtendedRequest, res: Response) => {
  const {columnId: souceColumnId} = req.params;
  const {targetColumnId, cardId} = req.body;
  const board = req.board!;

  const sourceColumn = board.columns.find(col => col._id.toString() === souceColumnId);
  const targetColumn = board.columns.find(col => col._id.toString() === targetColumnId);

  if (!sourceColumn || !targetColumn) {
    return res.status(404).json({message: 'One of the columns not found'});
  }
  const cardIndex = sourceColumn.cards.findIndex(card => card._id.toString() === cardId);
  if (cardIndex === -1) {
    return res.status(404).json({message: 'Card not found in source column'});
  }

  const [card] = sourceColumn.cards.splice(cardIndex, 1);
  targetColumn.cards.push(card);

  await board.save();
  return res.status(200).json({message: 'Card moved successfully'});
});

export const editCard = catchAsync(async (req: ExtendedRequest, res: Response) => {
  const {title, description} = req.body;
  const board = req.board!;
  const card = req.card!;

  if (title) card.title = title;
  if (description) card.description = description;

  await board.save();

  return res.status(200).json(card);
});

export const deleteCard = catchAsync(async (req: ExtendedRequest, res: Response) => {
  const board = req.board!;
  const column = req.column!;
  const card = req.card!;

  column.cards = column.cards.filter(c => c._id.toString() !== card._id.toString());

  await board.save();

  return res.status(200).json({message: 'Card deleted successfully'});
});
