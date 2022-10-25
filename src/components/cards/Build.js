import React from 'react';
import { useNavigate } from "react-router-dom";

const Build = ({name, id}) => {

    let navigate = useNavigate();

    function viewBuild(id) {
        navigate(`/builds/${id}`)
      }

  return (
    <div>
        {name}
        <button id="view" onClick={() => viewBuild(id)}>View Build</button>
    </div>
  )
}

export default Build