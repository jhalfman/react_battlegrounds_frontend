import React, { useEffect, useState } from 'react'
import Build from './Build';
import { useNavigate } from "react-router-dom";

const Builds = ({setTeamBuilder, buildList}) => {
  let navigate = useNavigate();

  function createNewBuild() {
  setTeamBuilder(true);
  navigate('/cards/cardselection')
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