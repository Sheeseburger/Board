import React, {useState, useEffect} from 'react';
import {ICard} from '../../interfaces/ICard';
interface CardProps {
  card: ICard;
}

const Card: React.FC<CardProps> = ({card}) => {
  return (
    <div key={card._id} className="card">
      <h2 className="title">{card.title}</h2>
      <div className="description">{card.description}</div>
    </div>
  );
};

export default Card;
