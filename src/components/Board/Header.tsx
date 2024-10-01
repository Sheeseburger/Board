import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import classNames from 'classnames';
import {IBoard, IBoardResponse} from '../../interfaces/IBoard';

import {openBoard} from '../../redux/slices/boardSlice';
import {createBoard, getBoardById} from '../../utils/board';
import './Board.css';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const Header: React.FC = () => {
  const [boardId, setBoardId] = useState('66f6ee84601f47eb4daef59d');
  const [newBoardName, setNewBoardName] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const dispatch = useDispatch();
  const selectedBoard: IBoard | null = useSelector((state: RootState) => state.board.selectedBoard);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isCreatingNew) {
      setNewBoardName(e.target.value);
    } else {
      setBoardId(e.target.value);
    }
  };

  const handleLoadBoard = async () => {
    if (boardId && !isCreatingNew) {
      const data: IBoardResponse = await getBoardById(boardId);
      console.log(data);
      dispatch(openBoard(data));
    }
  };

  const handleCreateNew = () => {
    setIsCreatingNew(true);
    setNewBoardName('');
  };

  const handleSaveNewBoard = async () => {
    if (newBoardName) {
      const data: IBoardResponse = await createBoard(newBoardName);
      dispatch(openBoard(data));
      setBoardId(data._id);
      setIsCreatingNew(false);
    }
  };

  const handleCancelCreate = () => {
    setIsCreatingNew(false);
    setNewBoardName('');
  };

  return (
    <>
      <div className="header-wrapper">
        <input
          type="text"
          placeholder={isCreatingNew ? 'Enter Board Name' : 'Enter Board ID'}
          value={isCreatingNew ? newBoardName : boardId}
          className="header-input"
          onChange={handleInputChange}
        />
        <div className="button-wrapper">
          {isCreatingNew ? (
            <>
              <button
                onClick={handleSaveNewBoard}
                disabled={newBoardName.length === 0}
                className={classNames('button', 'save')}>
                Save
              </button>
              <button onClick={handleCancelCreate} className={classNames('button', 'cancel')}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={handleLoadBoard} className={classNames('button', 'load')}>
                Load Board
              </button>
              <button onClick={handleCreateNew} className={classNames('button', 'create')}>
                Create new
              </button>
            </>
          )}
        </div>
      </div>
      <h2 className="header-name">{selectedBoard && selectedBoard.name}</h2>
    </>
  );
};

export default Header;
