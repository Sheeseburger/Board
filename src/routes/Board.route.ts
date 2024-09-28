import express from 'express';
import {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard
} from '../controllers/Board.controller';

const router = express.Router();

router.route('/').post(createBoard).get(getAllBoards);

router.route('/:id').get(getBoardById).patch(updateBoard).delete(deleteBoard);

export default router;
