import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { tmdbApi } from '../../services/api';
import Skeleton from '../../components/Skeleton';
import '../../styles/global.css';
import './series.css';
import AdsterraBanner from '../../components/AdsterraBanner';
import AdsterraContainer from '../../components/AdsterraContainer';
import AdsterraTopBanner from '../../components/AdsterraTopBanner';
import { Helmet } from 'react-helmet';

const Series = () => {
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [timeWindow, setTimeWindow] = useState('day');

    const getPageTitle = (window) => {
        const titles = {
            day: 'Séries em Alta Hoje | PipocaFLIX',
            week: 'Séries em Alta Esta Semana | PipocaFLIX'
        };
        return titles[window] || 'Séries em Alta | PipocaFLIX';
    };

    const getPageDescription = (window) => {
        const descriptions = {
            day: 'Descubra as séries mais populares do dia. Encontre os melhores títulos de TV com avaliações, sinopses e trailers.',
            week: 'Confira as séries mais populares da semana. Uma seleção especial dos títulos mais assistidos e comentados.'
        };
        return descriptions[window] || 'PipocaFLIX - Sua plataforma para descobrir as melhores séries. Encontre séries populares com avaliações, sinopses e trailers.';
    };

    const getKeywords = (series) => {
        const genres = series.reduce((acc, serie) => {
            if (serie.genre_ids) {
                serie.genre_ids.forEach(genreId => {
                    const genre = getGenreName(genreId);
                    if (genre && !acc.includes(genre)) {
                        acc.push(genre);
                    }
                });
            }
            return acc;
        }, []);

        return ['séries', 'tv shows', 'streaming', 'séries populares', ...genres].join(', ');
    };

    const getGenreName = (genreId) => {
        const genres = {
            10759: 'Ação e Aventura',
            16: 'Animação',
            35: 'Comédia',
            80: 'Crime',
            99: 'Documentário',
            18: 'Drama',
            10751: 'Família',
            10762: 'Infantil',
            9648: 'Mistério',
            10763: 'Notícias',
            10764: 'Reality Show',
            10765: 'Ficção Científica',
            10766: 'Novela',
            10767: 'Talk Show',
            10768: 'Guerra e Política'
        };
        return genres[genreId];
    };

    useEffect(() => {
        const loadSeries = async (pageNumber, window) => {
            try {
                setLoading(true);
                const response = await tmdbApi.get(`trending/tv/${window}`, {
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

        loadSeries(page, timeWindow);
    }, [page, timeWindow]);

    const handleTimeWindowChange = (window) => {
        setTimeWindow(window);
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
                aria-label="Página anterior"
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
                    aria-label={`Ir para página ${i}`}
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
                aria-label="Próxima página"
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
            <Helmet>
                <title>{getPageTitle(timeWindow)}</title>
                <meta name="description" content={getPageDescription(timeWindow)} />
                <meta name="keywords" content={getKeywords(series)} />
                <meta property="og:title" content={getPageTitle(timeWindow)} />
                <meta property="og:description" content={getPageDescription(timeWindow)} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={getPageTitle(timeWindow)} />
                <meta name="twitter:description" content={getPageDescription(timeWindow)} />
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            <AdsterraTopBanner />

            <header>
                <h1 className="page-title">PipocaFLIX - Séries em Alta</h1>
            </header>

            <nav className="badges" aria-label="Filtro de período">
                <button
                    className={`badge ${timeWindow === 'day' ? 'active' : ''}`}
                    onClick={() => handleTimeWindowChange('day')}
                    aria-pressed={timeWindow === 'day'}
                >Hoje</button>
                <button
                    className={`badge ${timeWindow === 'week' ? 'active' : ''}`}
                    onClick={() => handleTimeWindowChange('week')}
                    aria-pressed={timeWindow === 'week'}
                >Esta Semana</button>
            </nav>

            <main className="lista-series">
                {series.map((serie, index) => (
                    <React.Fragment key={serie.id}>
                        <article className="serie-card">
                            <div className="serie-poster">
                                <span className="vote-average" aria-label={`Avaliação: ${serie.vote_average.toFixed(2)}`}>
                                    {serie.vote_average.toFixed(2)}
                                </span>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                                    alt={`Poster da série ${serie.name}`}
                                    loading="lazy"
                                />
                            </div>
                            <strong className="serie-title">{serie.name}</strong>
                            <Link
                                to={`/serie/${serie.id}`}
                                className="btn-acessar"
                                aria-label={`Ver detalhes da série ${serie.name}`}
                            >
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
            </main>

            <nav className="pagination" aria-label="Navegação de páginas">
                {renderPaginationButtons()}
            </nav>

            <div className="ad-bottom-container">
                <AdsterraBanner />
            </div>
        </div>
    );
};

export default Series;