import {useEffect, useState} from 'react';
import NavBar from './components/navigation/NavBar';
import {Routes, Route } from 'react-router-dom';
import Cards from './components/cards/Cards';
import Home from './components/static/Home';
import Builds from './components/cards/Builds';
import BuildHighlight from './components/cards/BuildHighlight';
import CreateBuild from './components/cards/CreateBuild';

function App() {
  const [homeMessage, setHomeMessage] = useState("");
  const [cardMessage, setCardMessage] = useState([]);
  const [tribeMessage, setTribeMessage] = useState([]);
  const [tierMessage, setTierMessage] = useState([]);
  const [teamBuilder, setTeamBuilder] = useState(false)



  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cards" element={<Cards setTeamBuilder={setTeamBuilder} teamBuilder={teamBuilder}/>}>
          <Route path="createbuild" element={<CreateBuild />} />
        </Route>
        <Route path="/builds" element={<Builds setTeamBuilder={setTeamBuilder}/>} />
        <Route path="/builds/:id" element={<BuildHighlight />} />
      </Routes>
    </div>
  );
}

export default App;
