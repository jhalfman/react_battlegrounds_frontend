import React, { useEffect, useState } from 'react'
import Build from './Build';
import { useNavigate } from "react-router-dom";

const Builds = () => {
  const [buildList, setBuildList] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9292/builds")
    .then(resp => resp.json())
    .then(data => setBuildList(data))
  }, [])

 function createBuild() {
  console.log("Creating new build")
  fetch("http://localhost:9292/builds", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: "post tester 1",
      card1: 8,
      card2: 37,
      card3: 89,
      card4: 14,
      card5: 109,
      card6: 110,
      card7: 111
    }),
  })
  .then(resp => resp.json())
  .then(data => navigate(`${data.id}`))
  
 }


  return (
    <div>
      {buildList.map(build => {
        return <Build key={build.name} name={build.name} id={build.id}/>
      })}
      <button id='add_build' onClick={createBuild}>Add Build</button>
    </div>
  )
}

export default Builds