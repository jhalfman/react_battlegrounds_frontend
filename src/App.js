import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [routeMessage, setRouteMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:9292")
    .then(resp => resp.json())
    .then(data => setRouteMessage(data.message))
  })

  return (
    <div className="App">
      {routeMessage}
    </div>
  );
}

export default App;
