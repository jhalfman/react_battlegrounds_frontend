import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [homeMessage, setHomeMessage] = useState("");
  const [cardMessage, setCardMessage] = useState([]);
  const [tribeMessage, setTribeMessage] = useState([]);
  const [tierMessage, setTierMessage] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292")
    .then(resp => resp.json())
    .then(data => setHomeMessage(data.message))
    
    fetch("http://localhost:9292/tribes")
    .then(resp => resp.json())
    .then(data => setTribeMessage(data))
    
    fetch("http://localhost:9292/tiers")
    .then(resp => resp.json())
    .then(data => setTierMessage(data))

    fetch("http://localhost:9292/cards")
    .then(resp => resp.json())
    .then(data => setCardMessage(data))
  }, [])

  return (
    <div className="App">
      {homeMessage}
      {tribeMessage.map(tribe => {
        return <div key={tribe.id}>{tribe.name}</div>
      })}
      {tierMessage.map(tier => {
        return <div key={tier.id}>{tier.tier}</div>
      })}
      {cardMessage.map(card => {
        return <div key={card.id}>{card.name}</div>
      })}
    </div>
  );
}

export default App;
