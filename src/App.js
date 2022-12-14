import {useEffect, useState} from 'react';
import NavBar from './components/navigation/NavBar';
import {Routes, Route } from 'react-router-dom';
import Cards from './components/cards/Cards';
import Home from './components/static/Home';
import Builds from './components/cards/Builds';
import BuildHighlight from './components/cards/BuildHighlight';
import CreateBuild from './components/cards/CreateBuild';
import CardHighlight from './components/cards/CardHighlight';
import CreateCard from './components/cards/CreateCard';

function App() {
  const [teamBuilder, setTeamBuilder] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [buildList, setBuildList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/builds")
    .then(resp => resp.json())
    .then(data => setBuildList(data))

    fetch("http://localhost:9292/cards")
    .then(resp => resp.json())
    .then(data => {
        setCardList(data);
    })
  }, [])

  
  

  return (
    <div className="App">
      <NavBar setTeamBuilder={setTeamBuilder}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cards" element={<Cards setTeamBuilder={setTeamBuilder} teamBuilder={teamBuilder} cardList={cardList}/>}>
          <Route path="cardselection" element={<CreateBuild setBuildList={setBuildList} buildList={buildList} setTeamBuilder={setTeamBuilder}  cardList={cardList} setCardList={setCardList}/>} />
        </Route>
        <Route path="/cards/:id" element={<CardHighlight cardList={cardList} setCardList={setCardList} setBuildList={setBuildList} buildList={buildList}/>} />
        <Route path="/cards/createcard" element={<CreateCard cardList={cardList} setCardList={setCardList}/>} />
        <Route path="/builds" element={<Builds setTeamBuilder={setTeamBuilder} buildList={buildList}/>} />
        <Route path="/builds/:id" element={<BuildHighlight setBuildList={setBuildList} buildList={buildList} cardList={cardList} setCardList={setCardList}/>} />
      </Routes>
    </div>
  );
}

export default App;
