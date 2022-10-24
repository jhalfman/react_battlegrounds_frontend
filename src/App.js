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
  const [teamBuilder, setTeamBuilder] = useState(false);
  const [buildList, setBuildList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/builds")
    .then(resp => resp.json())
    .then(data => setBuildList(data))
  }, [])
  

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cards" element={<Cards setTeamBuilder={setTeamBuilder} teamBuilder={teamBuilder} />}>
          <Route path="createbuild" element={<CreateBuild setBuildList={setBuildList} buildList={buildList}/>} />
        </Route>
        <Route path="/builds" element={<Builds setTeamBuilder={setTeamBuilder} buildList={buildList}/>} />
        <Route path="/builds/:id" element={<BuildHighlight setBuildList={setBuildList} buildList={buildList}/>} />
      </Routes>
    </div>
  );
}

export default App;
