import React, { useState } from 'react'
import './search-bar.css'

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch(searchTerm)
        setIsExpanded(false)
    }

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
        if (!isExpanded) {
            // Foco no input quando expandir
            setTimeout(() => {
                document.querySelector('.search-input')?.focus()
            }, 100)
        }
    }

    return (
        <div className={`search-container ${isExpanded ? 'expanded' : ''}`}>
            <button
                className="search-icon-button"
                onClick={toggleExpanded}
                aria-label="Abrir busca"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </button>

            <form
                className={`search-form ${isExpanded ? 'visible' : ''}`}
                onSubmit={handleSubmit}
            >
                <input
                    className="search-input"
                    type="text"
                    placeholder="Buscar filmes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    type="submit"
                    className="search-submit"
                    aria-label="Buscar"
                >
                    Buscar
                </button>
            </form>
        </div>
    )
}

export default SearchBar 