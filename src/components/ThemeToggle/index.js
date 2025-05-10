import React, { useEffect, useState } from 'react'
import './theme-toggle.css'

const ThemeToggle = () => {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light'
        setTheme(savedTheme)
        document.documentElement.setAttribute('data-theme', savedTheme)
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
    }

    return (
        <button
            className={`theme-toggle ${theme}`}
            onClick={toggleTheme}
            aria-label={`Alternar para modo ${theme === 'light' ? 'escuro' : 'claro'}`}
        >
            <div className="toggle-track">
                <div className="toggle-thumb"></div>
                <div className="toggle-icon sun">☀️</div>
                <div className="toggle-icon moon">🌙</div>
            </div>
        </button>
    )
}

export default ThemeToggle 