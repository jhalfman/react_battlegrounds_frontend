import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';
import { useNavigate } from "react-router-dom";

const BuildHighlight = () => {
    const [currentBuild, setCurrentBuild] = useState([])
    let {id} = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:9292/builds/${id}`)
        .then(resp => resp.json())
        .then(data => setCurrentBuild(data))
    }, [])

    function backToBuilds() {
        navigate("/builds")
    }

    function deleteBuild() {
        fetch(`http://localhost:9292/builds/${id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(data => navigate("/builds"))
    }

    
  return (
    <div>
        {currentBuild.map(card => {
            return <Card key={card.id} card={card} />
        })}
        <button>Edit Build</button>
        <button onClick={deleteBuild}>Delete Build</button>
        <button onClick={backToBuilds}>Back</button>
    </div>
  )
}

export default BuildHighlight