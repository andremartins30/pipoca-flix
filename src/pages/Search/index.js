import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Skeleton from '../../components/Skeleton';
import './search.css';

const Search = () => {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const query = searchParams.get('q');

    const searchMovies = useCallback(async () => {
        if (!query) return;

        setLoading(true);
        try {
            const response = await api.get('/search/movie', {
                params: {
                    api_key: "45987c192cb22153a3fd72a71eee5003",
                    language: "pt-BR",
                    query: query
                }
            });

            // Ordena os filmes pela data de lançamento (mais recente para mais antigo)
            const sortedResults = response.data.results.sort((a, b) => {
                const dateA = new Date(a.release_date);
                const dateB = new Date(b.release_date);
                return dateB - dateA;
            });

            setResults(sortedResults);
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
        } finally {
            setLoading(false);
        }
    }, [query]);

    useEffect(() => {
        searchMovies();
    }, [searchMovies]);

    if (loading) {
        return <Skeleton />;
    }

    return (
        <div className="container">
            <h1>Resultados para: {query}</h1>

            <div className="lista-filmes">
                {results.map((movie) => (
                    <article key={movie.id} className="filme-card">
                        <div className="filme-poster">
                            <span className="vote-average">{movie.vote_average?.toFixed(2)}</span>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                loading="lazy"
                            />
                        </div>
                        <strong className="filme-title">
                            {movie.title}
                        </strong>
                        <Link to={`/filme/${movie.id}`} className="btn-acessar">
                            <span>Ver Detalhes</span>
                        </Link>
                    </article>
                ))}
            </div>

            {results.length === 0 && (
                <p className="no-results">Nenhum filme encontrado para sua busca.</p>
            )}
        </div>
    );
};

export default Search;