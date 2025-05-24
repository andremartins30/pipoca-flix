import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { tmdbApi } from '../../services/api'
import { Link } from 'react-router-dom'
import Skeleton from '../../components/Skeleton'
import { Helmet } from 'react-helmet'
import './list-filmes.css'

const endpoints = {
    now_playing: 'movie/now_playing',
    popular: 'movie/popular',
    top_rated: 'movie/top_rated',
    upcoming: 'movie/upcoming',
}

const getPageTitle = (activeList) => {
    const titles = {
        now_playing: 'Filmes em Cartaz | PipocaFLIX',
        popular: 'Filmes Populares | PipocaFLIX',
        top_rated: 'Filmes Mais Bem Avaliados | PipocaFLIX',
        upcoming: 'Filmes em Breve | PipocaFLIX'
    };
    return titles[activeList] || 'Filmes | PipocaFLIX';
};

const ListFilmes = () => {
    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [activeList, setActiveList] = useState('now_playing')

    const loadFilmes = useCallback(async (pageNumber, list) => {
        try {
            setLoading(true)
            const response = await tmdbApi.get(endpoints[list], {
                params: {
                    api_key: "45987c192cb22153a3fd72a71eee5003",
                    language: "pt-BR",
                    page: pageNumber,
                }
            })

            setFilmes(response.data.results)
            setTotalPages(response.data.total_pages)
            setLoading(false)
        } catch (error) {
            console.error('Erro ao carregar filmes:', error)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadFilmes(page, activeList)
    }, [page, activeList, loadFilmes])

    const handleBadgeClick = useCallback((list) => {
        setActiveList(list)
        setPage(1)
    }, [])

    const handlePageChange = useCallback((newPage) => {
        setPage(newPage)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const renderPaginationButtons = useMemo(() => {
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
    }, [page, totalPages, handlePageChange]);

    if (loading) {
        return <Skeleton />
    }

    return (
        <div className='container'>
            <Helmet>
                <title>{getPageTitle(activeList)}</title>
                <meta name="description" content="Explore nossa coleção completa de filmes. Encontre os melhores filmes em cartaz, populares, mais bem avaliados e próximos lançamentos." />
                <meta name="keywords" content="filmes, cinema, streaming, lançamentos, filmes populares, filmes em cartaz, avaliações de filmes" />
                <meta property="og:title" content={getPageTitle(activeList)} />
                <meta property="og:description" content="Explore nossa coleção completa de filmes. Encontre os melhores filmes em cartaz, populares, mais bem avaliados e próximos lançamentos." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            <h1 className="page-title">Filmes</h1>

            <nav className='badges' aria-label="Categorias de filmes">
                <button
                    className={`badge ${activeList === 'now_playing' ? 'active' : ''}`}
                    onClick={() => handleBadgeClick('now_playing')}
                    aria-pressed={activeList === 'now_playing'}
                >Lançamentos</button>
                <button
                    className={`badge ${activeList === 'popular' ? 'active' : ''}`}
                    onClick={() => handleBadgeClick('popular')}
                    aria-pressed={activeList === 'popular'}
                >Populares</button>
                <button
                    className={`badge ${activeList === 'top_rated' ? 'active' : ''}`}
                    onClick={() => handleBadgeClick('top_rated')}
                    aria-pressed={activeList === 'top_rated'}
                >Mais bem avaliados</button>
                <button
                    className={`badge ${activeList === 'upcoming' ? 'active' : ''}`}
                    onClick={() => handleBadgeClick('upcoming')}
                    aria-pressed={activeList === 'upcoming'}
                >Em breve</button>
            </nav>

            <main className="lista-filmes">
                {filmes.map((filme) => (
                    <article key={filme.id} className="filme-card">
                        <div className="filme-poster">
                            <span className="vote-average" aria-label={`Avaliação: ${filme.vote_average.toFixed(2)}`}>
                                {filme.vote_average.toFixed(2)}
                            </span>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                                alt={`Poster do filme ${filme.title}`}
                                loading="lazy"
                                width="500"
                                height="750"
                            />
                        </div>
                        <strong className="filme-title">
                            {filme.title}
                        </strong>
                        <Link to={`/filme/${filme.id}`} className="btn-acessar" aria-label={`Ver detalhes do filme ${filme.title}`}>
                            <span>Ver Detalhes</span>
                        </Link>
                    </article>
                ))}
            </main>

            <nav className="pagination" aria-label="Navegação de páginas">
                {renderPaginationButtons}
            </nav>
        </div>
    )
}

export default ListFilmes