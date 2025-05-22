import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Skeleton from '../../components/Skeleton';
import '../../styles/global.css';
import './series.css';
import AdsterraBanner from '../../components/AdsterraBanner';
import AdsterraContainer from '../../components/AdsterraContainer';
import AdsterraTopBanner from '../../components/AdsterraTopBanner';

const Series = () => {
    const endpoints = useMemo(() => ({
        popular: 'tv/popular',
        top_rated: 'tv/top_rated',
        on_the_air: 'tv/on_the_air',
        airing_today: 'tv/airing_today',
    }), []);

    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeList, setActiveList] = useState('popular');

    useEffect(() => {
        const loadSeries = async (pageNumber, list) => {
            try {
                setLoading(true);
                const response = await api.get(endpoints[list], {
                    params: {
                        api_key: "45987c192cb22153a3fd72a71eee5003",
                        language: "pt-BR",
                        page: pageNumber,
                    },
                });

                setSeries(response.data.results);
                setTotalPages(response.data.total_pages);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar séries:', error);
                setLoading(false);
            }
        };

        loadSeries(page, activeList);
    }, [page, activeList, endpoints]);

    const handleBadgeClick = (list) => {
        setActiveList(list);
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

            <h1 className="page-title">PipocaFLIX - Séries</h1>

            <div className="badges">
                <button
                    className={`badge ${activeList === 'popular' ? 'active' : ''}`}
                    onClick={() => handleBadgeClick('popular')}
                >Populares</button>
                <button
                    className={`badge ${activeList === 'top_rated' ? 'active' : ''}`}
                    onClick={() => handleBadgeClick('top_rated')}
                >Mais bem avaliadas</button>
                <button
                    className={`badge ${activeList === 'on_the_air' ? 'active' : ''}`}
                    onClick={() => handleBadgeClick('on_the_air')}
                >No ar</button>
                <button
                    className={`badge ${activeList === 'airing_today' ? 'active' : ''}`}
                    onClick={() => handleBadgeClick('airing_today')}
                >Estreando hoje</button>
            </div>

            <div className="lista-series">
                {series.map((serie, index) => (
                    <React.Fragment key={serie.id}>
                        <article className="serie-card">
                            <div className="serie-poster">
                                <span className="vote-average">{serie.vote_average.toFixed(2)}</span>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                                    alt={serie.name}
                                    loading="lazy"
                                />
                            </div>
                            <strong className="serie-title">{serie.name}</strong>
                            <Link to={`/serie/${serie.id}`} className="btn-acessar">
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

export default Series;