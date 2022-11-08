import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

const CreateCard = ({cardList, setCardList}) => {
  const [createCardForm, setCreateCardForm] = useState({
    name: "",
    tier: "",
    tribe: 1,
    url: ""
  })
  const navigate = useNavigate();

  function createCard(e) {
    e.preventDefault()
    if (createCardForm.name === "" || createCardForm.tier === "" || createCardForm.url === "") {
      alert("Please fill out entire form")
      return null
    }
      
    fetch("http://localhost:9292/cards", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            name: createCardForm.name,
            tier: createCardForm.tier,
            tribe: createCardForm.tribe,
            url: createCardForm.url,
            }),
        })
        .then(resp => resp.json())
        .then(card => {
          setCardList([
            ...cardList,
            card
          ])
          navigate(`/cards/${card.id}`)
        })
  }
  

  function updateCardForm(e) {
    const updatedForm = {
      ...createCardForm,
      [e.target.name]: e.target.value
    }
    setCreateCardForm(updatedForm);
  }

  return (
    <form onSubmit={createCard}>
      <h1>New Card Form</h1>
      <label name="name">Name:</label>
      <input name="name" type="text" onChange={updateCardForm} value={createCardForm.name}></input>
      <br></br>
      <label name="tier">Tier:</label>
      <input name="tier" type="text" onChange={updateCardForm} value={createCardForm.tier}></input>
      <br></br>
      <label name="tribe">Tribe:</label>
      <select value={createCardForm.tribe} name="tribe" onChange={updateCardForm}>
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
      </select>
      <br></br>
      <label name="url">Image URL:</label>
      <input name="url" type="text" onChange={updateCardForm} value={createCardForm.url}></input>
      <br></br>
      <input type="submit"></input>
    </form>
  )
}

export default CreateCard