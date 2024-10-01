import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IBoard} from '../../interfaces/IBoard';
import {RootState} from '../../redux/store';
import Column from '../Column/Column';
import './Board.css';
import {IColumn} from '../../interfaces/IColumn';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import {moveCard} from '../../redux/slices/cardSlice';
import {changeCardColumn} from '../../utils/card';
import Header from './Header';

const Board: React.FC = () => {
  const dispatch = useDispatch();

  const selectedBoard: IBoard | null = useSelector((state: RootState) => state.board.selectedBoard);

  useEffect(() => {
    if (selectedBoard) {
      console.log('Loaded Board:', selectedBoard);
    }
  }, [selectedBoard]);

  const onDragEnd = async (result: DropResult) => {
    if (!selectedBoard || !selectedBoard._id) return;
    const destination = result.destination;
    const source = result.source;
    const cardId: string = result.draggableId;
    if (!source || !destination) {
      return;
    }
    if (destination.droppableId === source.droppableId) return;
    console.log(source, destination);
    const moving = await changeCardColumn(
      cardId,
      source.droppableId,
      destination.droppableId,
      selectedBoard._id
    );
    if (moving) dispatch(moveCard(cardId, destination.droppableId, source.droppableId));
    else console.log('Something went wrong');
  };

  return (
    <div>
      <Header />
      {selectedBoard && (
        <div>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="columns-wrapper">
              {selectedBoard.columns.map((column: IColumn, index: number) => (
                <Column column={column} key={column._id} cardSpawn={index === 0} />
              ))}
            </div>
          </DragDropContext>
        </div>
      )}
    </div>
  );
};

export default Board;
