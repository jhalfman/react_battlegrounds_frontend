import React from 'react';
import { NavLink as Link} from 'react-router-dom';

const NavBar = ({setTeamBuilder}) => {
  return (
    <div className='navBar'>
        <Link to="/" >Home</Link>
        <Link onClick={() => setTeamBuilder(false)} to="/cards">Cards</Link>
        <Link onClick={() => setTeamBuilder(false)} to="/builds">Builds</Link>
    </div>
  )
}

export default NavBar