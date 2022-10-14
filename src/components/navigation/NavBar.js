import React from 'react';
import { NavLink as Link} from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='navBar'>
        <Link to="/">Home</Link>
        <Link to="/cards">Cards</Link>
        <Link to="/builds">Cards</Link>
    </div>
  )
}

export default NavBar