import React from 'react';
import { useParams } from 'react-router-dom';

const BuildHighlight = () => {
    let {id} = useParams();
  return (
    <div>{id}</div>
  )
}

export default BuildHighlight