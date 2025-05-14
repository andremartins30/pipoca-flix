import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './similar-movies.css';

const SimilarMovies = ({ movieId }) => {
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSimilarMovies = async () => {
            try {
                const response = await api.get(`/movie/${movieId}/similar`, {
                    params: {
                        api_key: "45987c192cb22153a3fd72a71eee5003",
                        language: "pt-BR",
                        page: 1
                    }
                });

                setSimilarMovies(response.data.results.slice(0, 6));
                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar filmes similares:', error);
                setLoading(false);
            }
        };

        fetchSimilarMovies();
    }, [movieId]);

    if (loading) {
        return <div className="similar-movies-loading">Carregando filmes similares...</div>;
    }

    if (similarMovies.length === 0) {
        return null;
    }

    return (
        <div className="similar-movies">
            <h3>Filmes que você pode gostar!</h3>
            <div className="similar-movies-grid">
                {similarMovies.map(movie => (
                    <Link to={`/filme/${movie.id}`} key={movie.id} className="similar-movie-card">
                        <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                            loading="lazy"
                        />
                        <h4>{movie.title}</h4>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SimilarMovies;