import React, { useEffect, useState } from 'react'
import Build from './Build';
import { useNavigate } from "react-router-dom";

const Builds = ({setTeamBuilder}) => {
  const [buildList, setBuildList] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9292/builds")
    .then(resp => resp.json())
    .then(data => setBuildList(data))
  }, [])


 function createNewBuild() {
  setTeamBuilder(true);
  navigate('/cards/createbuild')
 }

  return (
    <div>
      {buildList.map(build => {
        return <Build key={build.name} name={build.name} id={build.id}/>
      })}
      <button id='add_build' onClick={createNewBuild}>Create New Build</button>
    </div>
  )
}

export default Builds