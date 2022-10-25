import React, {useState, useEffect} from 'react'
import Card from "./Card.js"
import { useNavigate, Outlet } from "react-router-dom";

const Cards = ({teamBuilder, setTeamBuilder, cardList}) => {
    
    const [filteredCardList, setFilteredCardList] = useState(cardList)
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

    function setFilter(e) {
        const newFilterList = {...filterList, [e.target.className]: parseInt(e.target.value)};
        setFilterList(newFilterList);
        filterCards(newFilterList);
    }

    function filterCards(filter) {
        const filteredCards = cardList.filter(card => {
            return (card.tier_id === filter.stars || filter.stars === 0) && (parseInt(card.tribe_id) === filter.tribe || filter.tribe === 0)
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
        const newCard = cardList.find(card => card.id === index)
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
        <button className='stars' value={1} onClick={setFilter}>⭐</button>
        <button className='stars' value={2} onClick={setFilter}>⭐⭐</button>
        <button className='stars' value={3} onClick={setFilter}>⭐⭐⭐</button>
        <button className='stars' value={4} onClick={setFilter}>⭐⭐⭐⭐</button>
        <button className='stars' value={5} onClick={setFilter}>⭐⭐⭐⭐⭐</button>
        <button className='stars' value={6} onClick={setFilter}>⭐⭐⭐⭐⭐⭐</button>
        <button className='stars' value={0} onClick={setFilter}>Reset stars</button>
        <select className="tribe" id="tribe" onChange={setFilter}>
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
        <div id={teamBuilder ? 'cardDisplay2' : 'cardDisplay'}>
        {filteredCardList.map(card => {
            return (
            <div key={card.id} id='displayCards'>
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