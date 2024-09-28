import {Router} from 'express';
import {createColumn, deleteColumn} from '../controllers/Column.controller';
import {findBoardById} from '../middlewares/FindBoardById';
import {findColumnFromBoard} from '../middlewares/FindColumnFromBoard';
import {findCardById} from '../middlewares/FindCardById';

const router = Router();

router.route('/:boardId/columns').post(findBoardById, createColumn);
router
  .route('/:boardId/columns/:columnId')
  .delete(findBoardById, findColumnFromBoard, deleteColumn);

export default router;
