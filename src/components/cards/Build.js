import React from 'react';
import { useNavigate } from "react-router-dom";

const Build = ({name, id, buildViewer}) => {

    let navigate = useNavigate();

    function buildViewer(id) {
        console.log(id);
        navigate(`/builds/${id}`)
      }

  return (
    <div>
        {name}
        <button id="view" onClick={() => buildViewer(id)}>View Build</button>
    </div>
  )
}

export default Build