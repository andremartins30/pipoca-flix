import React, { useState, useRef, useEffect } from 'react'
import './header.css'
import { Link, useNavigate } from 'react-router-dom'
import icon from './icon.png'
import ThemeToggle from '../ThemeToggle'

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
        }
    }

    // Fechar o menu quando clicar fora dele
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <header>
            <div className="header-left">
                <Link className='logo' to='/'>
                    <img src={icon} alt='icon' />
                    <span>PipocaFLIX</span>
                </Link>
            </div>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Buscar filmes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>

            <div className="header-right">
                <ThemeToggle />

                <div className="menu-container" ref={menuRef}>
                    <button
                        className="menu-button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                    >
                        <div className="menu-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>

                    {isMenuOpen && (
                        <div className="dropdown-menu">
                            <Link to="/" onClick={() => setIsMenuOpen(false)}>
                                Início
                            </Link>
                            <Link to="/favoritos" onClick={() => setIsMenuOpen(false)}>
                                Meus Filmes
                            </Link>
                            <Link to="/cinemas" onClick={() => setIsMenuOpen(false)}>
                                Cinemas Próximos
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header