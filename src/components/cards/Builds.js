import React, { useEffect, useState } from 'react'
import Build from './Build';

const Builds = () => {
  const [buildList, setBuildList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/builds")
    .then(resp => resp.json())
    .then(data => setBuildList(data))
  }, [])

 


  return (
    <div>
      {buildList.map(build => {
        return <Build key={build.name} name={build.name} id={build.id}/>
      })}
      <button id='add_build'>Add Build</button>
    </div>
  )
}

export default Builds