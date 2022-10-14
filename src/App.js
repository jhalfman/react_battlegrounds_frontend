import {useEffect, useState} from 'react';
import NavBar from './components/navigation/NavBar';
import {Routes, Route } from 'react-router-dom';
import Cards from './components/cards/Cards';
import Home from './components/static/Home';
import Builds from './components/cards/Builds';

function App() {
  const [homeMessage, setHomeMessage] = useState("");
  const [cardMessage, setCardMessage] = useState([]);
  const [tribeMessage, setTribeMessage] = useState([]);
  const [tierMessage, setTierMessage] = useState([]);



  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/builds" element={<Builds />} />
      </Routes>
    </div>
  );
}

export default App;
