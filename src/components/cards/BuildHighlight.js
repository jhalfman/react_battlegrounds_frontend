import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';
import { useNavigate } from "react-router-dom";

const BuildHighlight = ({setBuildList, buildList, cardList}) => {
    const [currentBuild, setCurrentBuild] = useState({cards: []})
    const [highlight, setHighlight] = useState({});
    const [replacementForm, setReplacementForm] = useState({
        cardId: null,
        buildIndex: null,
        replacementId: ""
    })
    const [editorOn, setEditorOn] = useState(false)
    const [replacementOn, setReplacementOn] = useState(false)
    const [confirmSelectionOn, setConfirmSelectionOn] = useState(false)
    let {id} = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const highlight = buildList.find(build => build.id === parseInt(id))
        console.log(highlight)
        if (highlight) {
            setCurrentBuild(highlight)
        }
    }, [])

    function deleteBuild() {
        fetch(`http://localhost:9292/builds/${id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(builds => {
            setBuildList(builds)
            navigate("/builds")
        })
    }

    function editBuild(id, index, e) {
        setReplacementOn(true);
        setReplacementForm({
            ...replacementForm,
            cardId: id,
            buildIndex: index
        })
        if (e.target.parentNode.id !== "highlight") {
            highlight.id = ""
            e.target.parentNode.id = "highlight"
            setHighlight(e.target.parentNode);
        }
    }

    function setReplacement(e) {
        setReplacementForm({
            ...replacementForm,
            replacementId: parseInt(e.target.value)
        })
        setConfirmSelectionOn(true)
    }

    function updateBuild(e) {
        e.preventDefault()
        fetch(`http://localhost:9292/builds/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cardId: replacementForm.cardId,
                replacementId: replacementForm.replacementId
            })
        })
        .then(resp => resp.json())
        .then(builds => {
            // const patchedBuild = currentBuild.map((card, index) => {
            //     if (index === replacementForm.buildIndex) {
            //         return data
            //     }
            //     else {
            //         return card
            //     }
            // })
            // setCurrentBuild(patchedBuild)
            // console.log(buildList, currentBuild, patchedBuild)
            setBuildList(builds)
            const highlight = builds.find(build => build.id === parseInt(id))
            setCurrentBuild(highlight)
            setReplacementForm({
                cardId: null,
                buildIndex: null,
                replacementId: ""
            })
            setEditorOn(false)
            setConfirmSelectionOn(false)
            setReplacementOn(false)
        });
    }

    const replacementSelectForm = (
    <form onSubmit={updateBuild} id='replacementForm'>
        <div id='replacementFormDiv'>
            <select onChange={setReplacement} value={replacementForm.replacementId} id='optionList'>
                {cardList.map(card => {
                    return <option key={card.id} value={card.id}>{card.name}  |  Tribe: {card.tribe.name}  |     Tier: {card.tier.tier}</option>
                })}
            </select>
            {confirmSelectionOn ? <button>Confirm Selection</button> : null}
        </div>
    </form>
    )

    
  return (
    <div id='buildHighlight'>
        <h1>{currentBuild.name}</h1>
        {editorOn ? <h2 id="selectHeader">Select a card to replace</h2> : null}
        <div id='highlightPanel'>
            {currentBuild.cards.map((card, index) => {
                return (
                    <div key={card.id} className="highlightCards">
                        <Card key={card.id} card={card} />
                        {editorOn ? <button id='replaceButton' onClick={(e) => editBuild(card.id, index, e)}>Replace</button> : null}
                    </div>
                )
            })}
        </div>
        {replacementOn ? replacementSelectForm : null}
        <div id='buttons'>
            <button onClick={() => {setEditorOn(!editorOn); setReplacementOn(!replacementOn); highlight.id = ""}}>Edit Build</button>
            <button onClick={deleteBuild}>Delete Build</button>
            <button onClick={() => navigate("/builds")}>Back</button>
        </div>
    </div>
  )
}

export default BuildHighlight