import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { rawgApi } from '../../services/api';
import Skeleton from '../../components/Skeleton';
import '../../styles/global.css';
import './games.css';
import AdsterraBanner from '../../components/AdsterraBanner';
import AdsterraContainer from '../../components/AdsterraContainer';
import AdsterraTopBanner from '../../components/AdsterraTopBanner';

const Games = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [ordering, setOrdering] = useState('-metacritic');

    useEffect(() => {
        const loadGames = async (pageNumber, order) => {
            try {
                setLoading(true);
                const response = await rawgApi.get('games', {
                    params: {
                        key: "b028504862e94a9696a210141ee95315",
                        page: pageNumber,
                        page_size: 20,
                        ordering: order,
                        language: "pt-BR",
                    },
                });

                setGames(response.data.results);
                setTotalPages(Math.ceil(response.data.count / 20));
                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar jogos:', error);
                setLoading(false);
            }
        };

        loadGames(page, ordering);
    }, [page, ordering]);

    const handleOrderingChange = (order) => {
        setOrdering(order);
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const isMobile = window.innerWidth <= 480;
        const maxVisiblePages = isMobile ? 3 : 5;

        let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        buttons.push(
            <button
                key="prev"
                className="pagination-btn"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
            >
                {isMobile ? '<' : 'Anterior'}
            </button>
        );

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`pagination-btn ${page === i ? 'active' : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        buttons.push(
            <button
                key="next"
                className="pagination-btn"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
            >
                {isMobile ? '>' : 'Próxima'}
            </button>
        );

        return buttons;
    };

    if (loading) {
        return <Skeleton />;
    }

    return (
        <div className="container">
            <AdsterraTopBanner />

            <h1 className="page-title">PipocaFLIX - Jogos</h1>

            <div className="badges">
                <button
                    className={`badge ${ordering === '-metacritic' ? 'active' : ''}`}
                    onClick={() => handleOrderingChange('-metacritic')}
                >Mais Bem Avaliados</button>
                <button
                    className={`badge ${ordering === '-rating' ? 'active' : ''}`}
                    onClick={() => handleOrderingChange('-rating')}
                >Mais Populares</button>
                <button
                    className={`badge ${ordering === '-released' ? 'active' : ''}`}
                    onClick={() => handleOrderingChange('-released')}
                >Lançamentos</button>
            </div>

            <div className="lista-games">
                {games.map((game, index) => (
                    <React.Fragment key={game.id}>
                        <article className="game-card">
                            <div className="game-poster">
                                {game.metacritic && (
                                    <span className={`metacritic-score ${game.metacritic >= 75 ? 'high' : game.metacritic >= 50 ? 'medium' : 'low'}`}>
                                        {game.metacritic}
                                    </span>
                                )}
                                <img
                                    src={game.background_image}
                                    alt={game.name}
                                    loading="lazy"
                                />
                            </div>
                            <strong className="game-title">{game.name}</strong>
                            <div className="game-info">
                                <span className="game-platforms">
                                    {game.platforms?.slice(0, 3).map(platform => platform.platform.name).join(', ')}
                                </span>
                            </div>
                            <Link to={`/game/${game.id}`} className="btn-acessar">
                                <span>Ver Detalhes</span>
                            </Link>
                        </article>

                        {(index + 1) % 17 === 0 && (
                            <div>
                                <AdsterraContainer />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className="pagination">
                {renderPaginationButtons()}
            </div>

            <div className="ad-bottom-container">
                <AdsterraBanner />
            </div>
        </div>
    );
};

export default Games; 