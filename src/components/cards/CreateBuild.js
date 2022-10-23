import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';


const CreateBuild = () => {
    const buildContext = useOutletContext();
    const {updateNewBuild} = buildContext.updateNewBuild
    const {newBuild} = buildContext.newBuild
    let navigate = useNavigate();
    

      function handleSubmit(e) {
        e.preventDefault();
        
        console.log("Creating new build")
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
        .then(data => navigate(`/builds`)) 
  
        }
        
      

      

  return (
    <div id='currentBuildDisplay'>
        <form id='newBuildForm' onSubmit={handleSubmit}>
            <input id='buildName' type="text" placeholder='Enter Build Name Here...' name='buildName' value={newBuild.name} onChange={updateNewBuild}>
            </input>
            {newBuild.cards.map((card, index) => {
                    return <img key={index} className='buildCardDisplay' src={card.cardImage} alt={card.cardName}></img>                
            })}
            <input id='newBuildSubmission' type="submit" value="CONFIRM NEW BUILD"></input>
        </form>
    </div>
  )
}

export default CreateBuild