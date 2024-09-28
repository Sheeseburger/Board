import React, {useState, useEffect} from 'react';
import {IColumn} from '../../interfaces/IColumn';
import './Column.css';
import Card from '../Card/Card';
import {ICard} from '../../interfaces/ICard';
import NewCard from '../Card/NewCard';

interface ColumnProps {
  column: IColumn;
  cardSpawn: boolean;
}

const Column: React.FC<ColumnProps> = ({column, cardSpawn = false}) => {
  return (
    <div key={column._id} className="column">
      <h2 className="header">{column.name}</h2>
      <div className="cards">
        {column.cards.map((card: ICard) => (
          <Card card={card}></Card>
        ))}
        {cardSpawn && <NewCard columnId={column._id} />}
      </div>
    </div>
  );
};

export default Column;
