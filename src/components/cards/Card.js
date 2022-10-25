import React from 'react'

const Card = ({card}) => {
  return (
    <img className="card" src={card.image_url} alt={card.name} />
  )
}

export default Card