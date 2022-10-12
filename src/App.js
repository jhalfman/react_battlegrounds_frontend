import './App.css';
import {useEffect} from 'react';

function App() {
  useEffect(() => {
    fetch("http://localhost/9292")
    .then(resp => resp.json())
    .then(data => console.log("hello"))
  })

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
