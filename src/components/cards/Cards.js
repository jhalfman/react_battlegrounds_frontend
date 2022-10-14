import React, {useState, useEffect} from 'react'
import Card from "./Card.js"

const Cards = () => {
    const [cardList, setCardList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9292/cards")
        .then(resp => resp.json())
        .then(data => setCardList(data));
    }, [])


  return (
    <div>
        {cardList.map(card => {
            return <Card key={card.id} card={card} />
        })}
    </div>
  )
}

export default Cards