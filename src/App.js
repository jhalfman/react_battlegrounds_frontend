import {useEffect, useState} from 'react';
import NavBar from './components/navigation/NavBar';
import {Routes, Route } from 'react-router-dom';

function App() {
  const [homeMessage, setHomeMessage] = useState("");
  const [cardMessage, setCardMessage] = useState([]);
  const [tribeMessage, setTribeMessage] = useState([]);
  const [tierMessage, setTierMessage] = useState([]);



  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<div>HEllo</div>} />
        <Route path="/cards" element={<div>cards</div>} />
      </Routes>
    </div>
  );
}

export default App;
