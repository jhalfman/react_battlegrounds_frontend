import React, {useState, useEffect} from 'react'
import Card from "./Card.js"

const Cards = () => {
    const [cardList, setCardList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9292/cards")
        .then(resp => resp.json())
        .then(data => setCardList(data));
    }, [])

    function filterCards(stars) {
        fetch("http://localhost:9292/cards/:stars")
        .then(resp => resp.json())
        .then(data => setCardList(data))
    }

  return (
    <div>
        <div onClick={() => filterCards(1)}>⭐</div>
        <div onClick={() => filterCards(2)}>⭐⭐</div>
        <div onClick={() => filterCards(3)}>⭐⭐⭐</div>
        <div onClick={() => filterCards(4)}>⭐⭐⭐⭐</div>
        <div onClick={() => filterCards(5)}>⭐⭐⭐⭐⭐</div>
        <div onClick={() => filterCards(6)}>⭐⭐⭐⭐⭐⭐</div>
        {cardList.map(card => {
            return <Card key={card.id} card={card} />
        })}
    </div>
  )
}

export default Cards