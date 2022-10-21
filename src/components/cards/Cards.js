import React, {useState, useEffect} from 'react'
import Card from "./Card.js"
import { useNavigate } from "react-router-dom";

const Cards = () => {
    const [cardList, setCardList] = useState([]);
    const [filterList, setFilterList] = useState({
        tier: 0,
        tribe: 0
    })
    let navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9292/cards")
        .then(resp => resp.json())
        .then(data => setCardList(data));
    }, [])

    function setStarsFilter(stars) {
        const newFilterList = {...filterList, stars: stars};
        setFilterList(newFilterList);
        filterCards(newFilterList);
    }
    
    function setTribeFilter(e) {
        const newFilterList = {...filterList, tribe: e.target.value}
        setFilterList(newFilterList);
        filterCards(newFilterList);
    }

    function filterCards(filter) {
        fetch(`http://localhost:9292/cards?stars=${filter.stars}&tribe=${filter.tribe}`)
        .then(resp => resp.json())
        .then(data => setCardList(data))
        navigate(`?stars=${filter.stars}&tribe=${filter.tribe}`)
    }

  return (
    <div>
        <div onClick={() => setStarsFilter(1)}>⭐</div>
        <div onClick={() => setStarsFilter(2)}>⭐⭐</div>
        <div onClick={() => setStarsFilter(3)}>⭐⭐⭐</div>
        <div onClick={() => setStarsFilter(4)}>⭐⭐⭐⭐</div>
        <div onClick={() => setStarsFilter(5)}>⭐⭐⭐⭐⭐</div>
        <div onClick={() => setStarsFilter(6)}>⭐⭐⭐⭐⭐⭐</div>
        <button onClick={() => setStarsFilter(0)}>Reset stars</button>
        <select name="tribe" id="tribe" onChange={setTribeFilter}>
            <option value="0">--Select a Tribe--</option>
            <option value="1">Beast</option>
            <option value="2">Murloc</option>
            <option value="3">Mech</option>
            <option value="4">Demon</option>
            <option value="5">Pirate</option>
            <option value="6">Dragon</option>
            <option value="7">Elemental</option>
            <option value="8">Quilboar</option>
            <option value="9">Naga</option>
            <option value="10">Neutral</option>
            <option value="11">All</option>
        </select>
        {cardList.map(card => {
            return <Card key={card.id} card={card} />
        })}
    </div>
  )
}

export default Cards