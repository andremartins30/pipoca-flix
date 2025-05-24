import React, { useState, useRef, useEffect } from 'react'
import './header.css'
import { Link, useNavigate } from 'react-router-dom'
import icon from './icon.png'
import ThemeToggle from '../ThemeToggle'
import SearchBar from '../SearchBar'

// Preload da logo
const preloadLogo = () => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = icon
    document.head.appendChild(link)
}

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const menuRef = useRef(null)
    const dropdownRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        preloadLogo()
    }, [])

    const handleSearch = (searchTerm) => {
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
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen)
        if (isMenuOpen) setIsMenuOpen(false)
    }

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen)
        if (isDropdownOpen) setIsDropdownOpen(false)
    }

    const handleDropdownItemClick = () => {
        setIsDropdownOpen(false)
    }

    const handleMenuItemClick = () => {
        setIsMenuOpen(false)
    }

    return (
        <header role="banner">
            <div className="header-left">
                <Link className='logo' to='/' aria-label="PipocaFLIX - Página Inicial">
                    <img
                        src={icon}
                        alt='Logo PipocaFLIX'
                        width="40"
                        height="40"
                        loading="eager"
                        fetchpriority="high"
                    />
                    <span className="site-title">PipocaFLIX</span>
                </Link>

                <nav className="nav-links desktop-only" aria-label="Menu principal">
                    <Link to="/filmes" className='nav-link' aria-current={window.location.pathname === '/filmes' ? 'page' : undefined}>Filmes</Link>
                    <Link to="/series" className='nav-link' aria-current={window.location.pathname === '/series' ? 'page' : undefined}>Séries</Link>
                    <Link to="/games" className='nav-link' aria-current={window.location.pathname === '/games' ? 'page' : undefined}>Games</Link>
                </nav>

                <div className={`nav-dropdown mobile-only ${isDropdownOpen ? 'active' : ''}`} ref={dropdownRef}>
                    <button
                        className="nav-dropdown-button"
                        onClick={handleDropdownClick}
                        aria-expanded={isDropdownOpen}
                        aria-controls="mobile-menu"
                        aria-label="Menu de navegação"
                    >
                        ▼
                    </button>
                    <nav id="mobile-menu" className="nav-dropdown-menu" aria-label="Menu mobile">
                        <Link to="/filmes" className='nav-link' onClick={handleDropdownItemClick} aria-current={window.location.pathname === '/filmes' ? 'page' : undefined}>Filmes</Link>
                        <Link to="/series" className='nav-link' onClick={handleDropdownItemClick} aria-current={window.location.pathname === '/series' ? 'page' : undefined}>Séries</Link>
                        <Link to="/games" className='nav-link' onClick={handleDropdownItemClick} aria-current={window.location.pathname === '/games' ? 'page' : undefined}>Games</Link>
                    </nav>
                </div>
            </div>

            <div className="header-right">
                <SearchBar onSearch={handleSearch} />
                <ThemeToggle />

                <div className="menu-container" ref={menuRef}>
                    <button
                        className="menu-button"
                        onClick={handleMenuClick}
                        aria-label="Menu de opções"
                        aria-expanded={isMenuOpen}
                        aria-controls="options-menu"
                    >
                        <div className="menu-icon" aria-hidden="true">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>

                    {isMenuOpen && (
                        <nav id="options-menu" className={`dropdown-menu ${isMenuOpen ? 'active' : ''}`} aria-label="Menu de opções">
                            <Link to="/" onClick={handleMenuItemClick} aria-current={window.location.pathname === '/' ? 'page' : undefined}>
                                Início
                            </Link>
                            <Link to="/favoritos" onClick={handleMenuItemClick} aria-current={window.location.pathname === '/favoritos' ? 'page' : undefined}>
                                Meus Filmes
                            </Link>
                            <Link to="/cinemas" onClick={handleMenuItemClick} aria-current={window.location.pathname === '/cinemas' ? 'page' : undefined}>
                                Cinemas Próximos
                            </Link>
                        </nav>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header