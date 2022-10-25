import React, {useState, useEffect} from 'react'
import Card from "./Card.js"
import { useNavigate, Outlet } from "react-router-dom";

const Cards = ({teamBuilder, setTeamBuilder}) => {
    const [cardList, setCardList] = useState([]);
    const [filteredCardList, setFilteredCardList] = useState([])
    const [filterList, setFilterList] = useState({
        stars: 0,
        tribe: 0
    })
    const [newBuild, setNewBuild] = useState({
        name: "",
        cards: [{
            cardName: "",
            cardId: null,
            cardImage: null
        },
        {
            cardName: "",
            cardId: null,
            cardImage: null
        },
        {
            cardName: "",
            cardId: null,
            cardImage: null
        },
        {
            cardName: "",
            cardId: null,
            cardImage: null
        },
        {
            cardName: "",
            cardId: null,
            cardImage: null
        },
        {
            cardName: "",
            cardId: null,
            cardImage: null
        },
        {
            cardName: "",
            cardId: null,
            cardImage: null
        }]
      })
    let navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9292/cards")
        .then(resp => resp.json())
        .then(data => {
            setCardList(data);
            setFilteredCardList(data)
        })
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
        const filteredCards = cardList.filter(card => {
            return (card.tier_id === filter.stars || filter.stars === 0) && (card.tribe_id === filter.tribe || filter.tribe === "0")
        })
        setFilteredCardList(filteredCards)
        
        navigate(`?stars=${filter.stars}&tribe=${filter.tribe}`)
    }

    function exitBuilder() {
        setTeamBuilder(false)
        navigate('/cards')
    }

    function updateNewBuild(e) {
        const updatedBuild = {
            ...newBuild,
            name: e.target.value
        }
        setNewBuild(updatedBuild);
      }

    function addToTeam(index) {
        let newCard = {};
        fetch(`http://localhost:9292/cards/${index}`)
        .then(resp => resp.json())
        .then(data => {
            newCard = data;
            let nextIndex = newBuild.cards.findIndex((card) => card.cardId === null)
            const updatedBuildList = newBuild.cards.map((card, index) => {
                if (index === nextIndex) {
                    return {cardName: newCard.name, cardId: newCard.id, cardImage: newCard.image_url}
                }
                else {
                    return card;
                }
            })
            setNewBuild({
                ...newBuild,
                cards: updatedBuildList
            })

        })
    }

    function removeFromTeam(index) {
        const newCardsArray = newBuild.cards.map((card, i) => {
            if (i === index) {
                return {
                    cardName: "",
                    cardId: null,
                    cardImage: null
                }
            }
            else {
                return card
            }
        })
        setNewBuild({
            ...newBuild,
            cards: newCardsArray
        })
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
        {teamBuilder ? <button onClick={exitBuilder}>Exit Builder</button> : null}
        <div id='cardDisplay'>
        {filteredCardList.map(card => {
            return (
            <div key={card.id}>
                <Card key={card.id} card={card} />
                {teamBuilder ? <button onClick={() => addToTeam(card.id)}>Add to Build</button> : null}
            </div>
            )
        })}
        </div>
        <Outlet context={{ updateNewBuild: {updateNewBuild}, newBuild: {newBuild}, removeFromTeam: {removeFromTeam} }}/>
    </div>
  )
}

export default Cards