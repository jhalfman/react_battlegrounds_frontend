import React, { useState } from 'react';


const CreateBuild = () => {
    const [newBuild, setNewBuild] = useState({
        name: "",
        cards: [{
            cardName: "",
            cardId: null
        },
        {
            cardName: "",
            cardId: null
        },
        {
            cardName: "",
            cardId: null
        },
        {
            cardName: "",
            cardId: null
        },
        {
            cardName: "",
            cardId: null
        },
        {
            cardName: "",
            cardId: null
        },
        {
            cardName: "",
            cardId: null
        }]
      })

      function handleSubmit(e) {
        e.preventDefault();
        console.log("Wow!")
      }

      function updateNewBuild(e) {
        const updatedBuild = {
            ...newBuild,
            name: e.target.value
        }
        setNewBuild(updatedBuild);
      }

  return (
    <div id='currentBuildDisplay'>
        <form id='newBuildForm' onSubmit={handleSubmit}>
            <input id='buildName' type="text" placeholder='Enter Build Name Here...' name='buildName' value={newBuild.name} onChange={updateNewBuild}>
            </input>
            {newBuild.cards.map((card, index) => {
                    return <div key={index} className='buildCardDisplay'>{card.cardName}</div>                
            })}
            <input id='newBuildSubmission' type="submit" value="CONFIRM NEW BUILD"></input>
        </form>
    </div>
  )
}

export default CreateBuild