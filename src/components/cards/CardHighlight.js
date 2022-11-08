import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const CardHighlight = ({cardList, setCardList, buildList, setBuildList}) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [editCardOn, setEditCardOn] = useState(false)
    const [highlightCard, setHighlightCard] = useState(undefined)
    const [editForm, setEditForm] = useState({})

    useEffect(() => {
        const newHighlight = cardList.find(card => card.id === parseInt(id));
        if  (newHighlight !== undefined) {
            setHighlightCard(newHighlight)
            setEditForm({
                cardName: newHighlight.name,
                tier: newHighlight.tier_id,
                tribe: newHighlight.tribe.id,
                url: newHighlight.image_url
            })
        }
        
    }, [cardList])

    function updateForm(e) {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        })
    }

    function updateCard(e) {
        e.preventDefault();
        fetch(`http://localhost:9292/cards/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cardName: editForm.cardName,
                tier: editForm.tier,
                tribe: editForm.tribe,
                url: editForm.url
            })
        })
        .then(resp => resp.json())
        .then(newCard => {
            setEditCardOn(false)
            const newCardList = cardList.map(card => {
                if (newCard.id === card.id) {
                    return newCard;
                }
                else {
                    return card
                }
            })
            setHighlightCard(newCard)
            setCardList(newCardList);
        })
    }

    function deleteCard() {
        fetch(`http://localhost:9292/cards/${id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(deletedCard => {
            const newCardList = cardList.filter(card => card.id !== deletedCard.id)
            setCardList(newCardList)
            const correctedBuildList = buildList.map(build => {
                const cardRemovedArray = build.cards.map(card => {
                    if (card.id !== deletedCard.id) {
                        return card
                    }
                    else {
                        return {
                            name: "",
                            cardId: null,
                            cardImage: null
                        }
                    }
                })
                return {...build, cards: cardRemovedArray}
            })
            setBuildList(correctedBuildList)
            
            navigate(`/cards`)
        })
    }

    
    if (highlightCard === undefined) {
        return <div>Loading Card...</div>
    }

    const cardInfoDiv = <ul id='cardInfo'>
                            <li>Card Name: {highlightCard.name}</li>
                            <li>Tier: {highlightCard.tier.tier} Stars</li>
                            <li>Tribe: {highlightCard.tribe.name}</li>
                            <li>Current builds: {highlightCard.builds.length !== 0 ? highlightCard.builds.map((build, index) => {
                                if (index === 0) {
                                    return build.name
                                }
                                else if (!highlightCard.builds.slice(0, index).some(item => item.id === build.id)) {
                                    return ", " + build.name
                                }
                            }) : "none"}
                            </li>
                            <button id="editCardButton" onClick={() => setEditCardOn(!editCardOn)}>Edit Card</button>
                        </ul>

    const editCardInfoDiv = <form id='editCardInfo' onSubmit={updateCard}>
                                <li>Card Name: <input type="text" value={editForm.cardName} name="cardName" onChange={updateForm}></input></li>
                                <li>Tier: <input type="number" value={editForm.tier} name="tier" onChange={updateForm}></input></li>
                                <li>Tribe: <select value={editForm.tribe} name="tribe" onChange={updateForm}>
                                                <option value={1}>Beast</option>
                                                <option value={2}>Murloc</option>
                                                <option value={3}>Mech</option>
                                                <option value={4}>Demon</option>
                                                <option value={5}>Pirate</option>
                                                <option value={6}>Dragon</option>
                                                <option value={7}>Elemental</option>
                                                <option value={8}>Quilboar</option>
                                                <option value={9}>Naga</option>
                                                <option value={10}>Neutral</option>
                                                <option value={11}>All</option>
                                    </select></li>
                                <li>Image URL: <input type="text" value={editForm.url} name="url" onChange={updateForm}></input></li>
                                <li>Current builds: {highlightCard.builds.length !== 0 ? highlightCard.builds.map((build, index) => {
                                                        if (index === 0) {
                                                            return build.name
                                                        }
                                                        else if (!highlightCard.builds.includes(build)) {
                                                            return ", " + build.name
                                                        }
                                                    }) : "none"}
                                </li>
                                <button type='button' onClick={() => setEditCardOn(!editCardOn)}>Cancel Edit</button>
                                <input type="submit" id='submitEditCardButton'></input>
                                <button type='button' onClick={deleteCard}>Delete Card</button>
                            </form>

  return (
    <div id='cardHighlight'>
        <img src={highlightCard.image_url} alt={highlightCard.name} id='highlightImage'/>
        {editCardOn ? editCardInfoDiv : cardInfoDiv}
        <button onClick={() => navigate(`/cards`)}>Back to Cards</button>
    </div>
  )
}

export default CardHighlight