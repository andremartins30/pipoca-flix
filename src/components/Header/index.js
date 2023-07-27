import React from 'react'
import './header.css'
import {Link} from 'react-router-dom'
import icon from './icon.png'



const Header = () => {
    return (
        <header>
            <Link className='logo' to='/'><img src={icon} alt='icon' />PipocaFLIX</Link>
            <Link className='favoritos' to='/favoritos'>Meus Filmes</Link>
        </header>
    )
}

export default Header