import {Router} from 'express';
import {createCard, moveCard, editCard, deleteCard} from '../controllers/Card.controller';
import {findBoardById} from '../middlewares/FindBoardById';
import {findColumnFromBoard} from '../middlewares/FindColumnFromBoard';
import {findCardById} from '../middlewares/FindCardById';

const router = Router();

router
  .route('/:boardId/columns/:columnId/cards')
  .post(findBoardById, findColumnFromBoard, createCard)
  .patch(findBoardById, moveCard);
router
  .route('/:boardId/columns/:columnId/cards/:cardId')
  .patch(findBoardById, findColumnFromBoard, findCardById, editCard)
  .delete(findBoardById, findColumnFromBoard, findCardById, deleteCard);

export default router;
