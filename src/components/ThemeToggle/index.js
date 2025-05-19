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
                <div className="toggle-sky">
                    <div className="sun"></div>
                    <div className="cloud cloud1"></div>
                    <div className="cloud cloud2"></div>
                    <div className="moon">
                        <div className="moon-spot spot1"></div>
                        <div className="moon-spot spot2"></div>
                    </div>
                    <div className="stars">
                        <div className="star s1"></div>
                        <div className="star s2"></div>
                        <div className="star s3"></div>
                        <div className="star s4"></div>
                        <div className="star s5"></div>
                    </div>
                </div>
            </div>
        </button>
    )
}

export default ThemeToggle
