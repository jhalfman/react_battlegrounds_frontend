import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';


const CreateBuild = ({setBuildList, buildList, setTeamBuilder}) => {
    const buildContext = useOutletContext();
    const {updateNewBuild} = buildContext.updateNewBuild
    const {newBuild} = buildContext.newBuild
    const {removeFromTeam} = buildContext.removeFromTeam
    let navigate = useNavigate();
    

      function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:9292/builds", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            name: newBuild.name,
            cards: newBuild.cards
            }),
        })
        .then(resp => resp.json())
        .then(build => {
          setBuildList([
            ...buildList,
            build
          ])
          setTeamBuilder(false)
          navigate(`/builds`)
        }) 
  
        }
        
      

      

  return (
    <div id='currentBuildDisplay'>
        <form id='newBuildForm' onSubmit={handleSubmit}>
            <input id='buildName' type="text" placeholder='Enter Build Name Here...' name='buildName' value={newBuild.name} onChange={updateNewBuild}>
            </input>
            {newBuild.cards.map((card, index) => {
                    return (
                    <div key={index} className='buildCardDisplay'>
                      <img key={index} src={card.cardImage} alt={card.cardName}></img>
                      {card.cardImage ? <button type="Button" onClick={() => removeFromTeam(index)}>Remove</button> : null}
                    </div>
                    )
            })}
            <input id='newBuildSubmission' type="submit" value="CONFIRM NEW BUILD"></input>
        </form>
    </div>
  )
}

export default CreateBuild