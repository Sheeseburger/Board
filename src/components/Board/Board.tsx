import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IBoard, IBoardResponse} from '../../interfaces/IBoard';
import {RootState} from '../../redux/store';
import {openBoard} from '../../redux/slices/boardSlice';
import {getBoardById} from '../../utils/board';
import Column from '../Column/Column';
import './Board.css';
import {IColumn} from '../../interfaces/IColumn';

const Board: React.FC = () => {
  const [boardId, setBoardId] = useState('66f6ee84601f47eb4daef59d');
  const dispatch = useDispatch();

  const selectedBoard: IBoard | null = useSelector(
    (state: RootState) => state.board.selectedBoard
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardId(e.target.value);
  };

  const handleLoadBoard = async () => {
    if (boardId) {
      const data: IBoardResponse = await getBoardById(boardId);
      console.log(data);
      dispatch(openBoard(data));
    }
  };

  useEffect(() => {
    if (selectedBoard) {
      console.log('Loaded Board:', selectedBoard);
    }
  }, [selectedBoard]);

  return (
    <div>
      <h1>Load Board</h1>
      <input
        type="text"
        placeholder="Enter Board ID"
        value={boardId}
        onChange={handleInputChange}
      />
      <button onClick={handleLoadBoard}>Load Board</button>

      {selectedBoard && (
        <div>
          <h2>Selected Board:</h2>
          <p>ID: {selectedBoard._id}</p>
          <p>Name: {selectedBoard.name}</p>
          <div className="columns-wrapper">
            {selectedBoard.columns.map((column: IColumn, index: number) => (
              <Column column={column} cardSpawn={index === 0}></Column>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
