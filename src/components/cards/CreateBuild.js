import React, { useState } from 'react';


const CreateBuild = () => {
    const [newBuild, setNewBuild] = useState({
        name: "",
        card1: {
            cardName: "",
            cardId: null
        },
        card2: {
            cardName: "",
            cardId: null
        },
        card3: {
            cardName: "",
            cardId: null
        },
        card4: {
            cardName: "",
            cardId: null
        },
        card5: {
            cardName: "",
            cardId: null
        },
        card6: {
            cardName: "",
            cardId: null
        },
        card7: {
            cardName: "",
            cardId: null
        }
      })

      function handleSubmit() {
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
    <div>
        <form id='newBuildForm' onSubmit={handleSubmit}>
            <input id='buildName' type="text" placeholder='Enter Build Name Here...' name='buildName' value={newBuild.name} onChange={updateNewBuild}>
            </input>
            <div className='cardSlot'>

            </div>
        </form>
    </div>
  )
}

export default CreateBuild