import React, {useState, ChangeEvent} from 'react';
import classNames from 'classnames';
import {ICard} from '../../interfaces/ICard';
import {useDispatch, useSelector} from 'react-redux';
import {addCard, removeCard, updateCard} from '../../redux/slices/cardSlice';
import {createCard, deleteCard, patchCard} from '../../utils/card';
import {RootState} from '../../redux/store';
import {Draggable} from 'react-beautiful-dnd';
import './Card.css';

interface CardProps {
  card?: ICard;
  index: number;
  columnId: string;
  isNewCard?: boolean;
}

const Card: React.FC<CardProps> = ({card, index, columnId, isNewCard = false}) => {
  const dispatch = useDispatch();
  const boardId: string | undefined = useSelector(
    (state: RootState) => state.board.selectedBoard?._id
  );

  const [active, setActive] = useState<boolean>(false);
  const [data, setData] = useState<ICard>({
    _id: card?._id || '',
    title: card?.title || '',
    description: card?.description || ''
  });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData(prev => ({...prev, title: e.target.value}));
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setData(prev => ({...prev, description: e.target.value}));
  };

  const cleanUp = () => {
    setData({title: '', description: '', _id: ''});
    setActive(false);
  };

  const handleSave = async () => {
    if (isNewCard) {
      if (data.description.length > 0 && data.title.length > 0) {
        const res = await createCard(boardId, columnId, data);
        dispatch(addCard(res, columnId));
      }
    } else {
      if (card && boardId && columnId) {
        const res = await patchCard(card._id, boardId, columnId, data);
        if (res) dispatch(updateCard(res, columnId));
      }
    }
    cleanUp();
  };

  const handleCancel = () => {
    cleanUp();
  };

  const handleEditClick = () => {
    if (card) setData(card);
    setActive(true);
  };

  const handleDeleteClick = async () => {
    if (card && boardId && columnId) {
      const res = await deleteCard(card._id, boardId, columnId);
      if (res) dispatch(removeCard(card._id, columnId));
    }
  };
  return (
    <Draggable draggableId={card ? card._id : 'new'} isDragDisabled={isNewCard} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={isNewCard && !active ? () => setActive(true) : undefined}
          className={classNames('card', !active && 'centred', !active && isNewCard && 'usable')}
          key={card ? card._id : 'new'}>
          {!active ? (
            isNewCard ? (
              <img src={`${process.env.PUBLIC_URL}/icons/add.png`} className="new" alt="+" />
            ) : (
              <>
                <h3>{card?.title}</h3>
                <p>{card?.description}</p>
                <div className="icons-wrapper">
                  <img
                    src={`${process.env.PUBLIC_URL}/icons/edit.png`}
                    className={classNames('icon', 'edit')}
                    onClick={handleEditClick}
                    alt="edit"
                  />
                  <img
                    src={`${process.env.PUBLIC_URL}/icons/del.png`}
                    className={classNames('icon', 'delete')}
                    onClick={handleDeleteClick}
                    alt="del"
                  />
                </div>
              </>
            )
          ) : (
            <>
              <input
                type="text"
                className={classNames('title', 'input')}
                value={data.title}
                placeholder="Title"
                onChange={handleTitleChange}
              />
              <textarea
                placeholder="Description"
                className={classNames('description', 'textarea')}
                value={data.description}
                onChange={handleDescriptionChange}
              />
              <div className="buttons">
                <button className={classNames('button', 'save')} onClick={handleSave}>
                  Save
                </button>
                <button className={classNames('button', 'cancel')} onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
