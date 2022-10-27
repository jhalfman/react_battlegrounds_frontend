import React from 'react';
import { useNavigate } from "react-router-dom";

const Card = ({card}) => {
  const navigate = useNavigate();

  return (
    <img className="card" src={card.image_url} alt={card.name} onClick={() => navigate(`/cards/${card.id}`)}/>
  )
}

export default Card