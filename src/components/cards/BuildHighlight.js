import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';
import { useNavigate } from "react-router-dom";

const BuildHighlight = ({setBuildList, buildList, cardList}) => {
    const [currentBuild, setCurrentBuild] = useState([])
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
            setCurrentBuild(highlight.cards)
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

    function editBuild(id, index) {
        setReplacementOn(true);
        setReplacementForm({
            ...replacementForm,
            cardId: id,
            buildIndex: index
        })
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
            setCurrentBuild(highlight.cards)
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
    <form onSubmit={updateBuild}>
        <div>
            <select onChange={setReplacement} value={replacementForm.replacementId}>
                {cardList.map(card => {
                    return <option key={card.id} value={card.id}>{card.name}  |  Tribe: {card.tribe.name}  |     Tier: {card.tier.tier}</option>
                })}
            </select>
            {confirmSelectionOn ? <button>Confirm Selection</button> : null}
        </div>
    </form>
    )

    
  return (
    <div>
        {editorOn ? <h3>Select a card to replace</h3> : null}
        {currentBuild.map((card, index) => {
            return (
                <div key={card.id}>
                    <Card key={card.id} card={card} />
                    <h6>Builds: {card.builds ? card.builds.map((card, index) => {
                        if (index === 0) {
                            return card.name
                        }
                        else {
                            return ", " + card.name
                        }
                    }) : "none"}</h6>
                    {editorOn ? <button onClick={(e) => editBuild(card.id, index)}>Replace</button> : null}
                </div>
            )
        })}
        {replacementOn ? replacementSelectForm : null}
        <button onClick={() => setEditorOn(!editorOn)}>Edit Build</button>
        <button onClick={deleteBuild}>Delete Build</button>
        <button onClick={() => navigate("/builds")}>Back</button>
    </div>
  )
}

export default BuildHighlight