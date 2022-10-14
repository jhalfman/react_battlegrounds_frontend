import React from 'react'

const Card = ({card}) => {
  return (
    <img src={card.image_url} alt={card.name} onClick={() => console.log(card.name)}/>
  )
}

export default Card