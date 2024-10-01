import React from 'react';
import {IColumn} from '../../interfaces/IColumn';
import './Column.css';
import Card from '../Card/Card';
import {ICard} from '../../interfaces/ICard';
import {Droppable} from 'react-beautiful-dnd';

interface ColumnProps {
  column: IColumn;
  cardSpawn: boolean;
}

const Column: React.FC<ColumnProps> = ({column, cardSpawn = false}) => {
  return (
    <div key={column._id} className="column">
      <h2 className="header">{column.name}</h2>
      <Droppable droppableId={column._id}>
        {provided => (
          <div className="cards" ref={provided.innerRef} {...provided.droppableProps}>
            {column.cards.map((card: ICard, index: number) => (
              <Card card={card} columnId={column._id} index={index} key={card._id} />
            ))}
            {cardSpawn && <Card columnId={column._id} index={-1} key={'new'} isNewCard />}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
