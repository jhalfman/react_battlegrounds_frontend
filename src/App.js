import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [homeMessage, setHomeMessage] = useState("");
  const [cardMessage, setCardMessage] = useState("");
  const [tribeMessage, setTribeMessage] = useState([]);
  const [tierMessage, setTierMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:9292")
    .then(resp => resp.json())
    .then(data => setHomeMessage(data.message))
    
    fetch("http://localhost:9292/tribes")
    .then(resp => resp.json())
    .then(data => setTribeMessage(data))
    
    /* fetch("http://localhost:9292")
    .then(resp => resp.json())
    .then(data => setHomeMessage(data.message)) */

    /* fetch("http://localhost:9292")
    .then(resp => resp.json())
    .then(data => setHomeMessage(data.message)) */
  }, [])

  return (
    <div className="App">
      {homeMessage}
      {tribeMessage.map(tribe => {
        return <div>{tribe.name}</div>
      })}
    </div>
  );
}

export default App;
