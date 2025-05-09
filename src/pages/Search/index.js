import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../../services/api'
import './search.css'

const Search = () => {
    const [searchParams] = useSearchParams()
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    const query = searchParams.get('q')

    useEffect(() => {
        const searchMovies = async () => {
            if (!query) return

            setLoading(true)
            try {
                const response = await api.get('/search/movie', {
                    params: {
                        api_key: "45987c192cb22153a3fd72a71eee5003",
                        language: "pt-BR",
                        query: query
                    }
                })
                setResults(response.data.results)
            } catch (error) {
                console.error('Erro ao buscar filmes:', error)
            } finally {
                setLoading(false)
            }
        }

        searchMovies()
    }, [query])

    if (loading) {
        return <div className="loading">Buscando filmes...</div>
    }

    return (
        <div className="search-results">
            <h1>Resultados para: {query}</h1>
            <div className="movies-grid">
                {results.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <h3>{movie.title}</h3>
                        <p>{movie.release_date}</p>
                    </div>
                ))}
            </div>
            {results.length === 0 && (
                <p className="no-results">Nenhum filme encontrado para sua busca.</p>
            )}
        </div>
    )
}

export default Search 