import React, {ChangeEvent, useState} from 'react';
import './Card.css';
import classNames from 'classnames';
import {ICard} from '../../interfaces/ICard';
import {useDispatch, useSelector} from 'react-redux';
import {addCard} from '../../redux/slices/cardSlice';
import {createCard} from '../../utils/card';
import {RootState} from '../../redux/store';

interface NewCardProps {
  columnId: string;
}

const NewCard: React.FC<NewCardProps> = ({columnId}) => {
  const dispatch = useDispatch();
  const boardId: string | undefined = useSelector(
    (state: RootState) => state.board.selectedBoard?._id
  );
  const [active, setActive] = useState<boolean>(false);
  const [data, setData] = useState<Omit<ICard, '_id'>>({
    title: '',
    description: ''
  });
  const handleClick = () => {
    setActive(!active);
  };
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData(prev => ({...prev, title: e.target.value}));
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setData(prev => ({...prev, description: e.target.value}));
  };

  const cleanUp = () => {
    setData({title: '', description: ''});
    setActive(false);
  };
  const handleCancel = () => {
    cleanUp();
  };

  const handleSave = async () => {
    const res = await createCard(boardId, columnId, data);
    dispatch(addCard(res, columnId));
    cleanUp();
  };
  return (
    <div
      key={'new'}
      onClick={!active ? handleClick : undefined}
      className={classNames('card', !active && 'centred', !active && 'usable')}>
      {!active ? (
        <img
          src={`${process.env.PUBLIC_URL}/icons/add.png`}
          className="new"
          alt="+"
        />
      ) : (
        <>
          <input
            type="text"
            className={classNames('title', 'input')}
            value={data.title}
            placeholder="title"
            onChange={handleTitleChange}
          />
          <textarea
            placeholder="description"
            className={classNames('description', 'textarea')}
            value={data.description}
            onChange={handleDescriptionChange}
          />
          <div className="buttons">
            <button
              className={classNames('button', 'save')}
              onClick={handleSave}>
              Save
            </button>
            <button
              className={classNames('button', 'cancel')}
              onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewCard;
//
