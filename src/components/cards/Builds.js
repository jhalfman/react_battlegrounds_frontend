import React, { useEffect, useState } from 'react'

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
        return build.name
      })}
    </div>
  )
}

export default Builds