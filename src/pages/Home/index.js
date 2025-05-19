import React from 'react'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import Skeleton from '../../components/Skeleton'
import AdSense from '../../components/AdSense'
import './home.css'
import AdsterraBanner from '../../components/AdsterraBanner'
import AdsterraContainer from '../../components/AdsterraContainer'

const endpoints = {
    now_playing: 'movie/now_playing',
    popular: 'movie/popular',
    top_rated: 'movie/top_rated',
    upcoming: 'movie/upcoming',
}

const Home = () => {
    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [activeList, setActiveList] = useState('now_playing')

    const loadFilmes = async (pageNumber, list) => {
        try {
            setLoading(true)
            const response = await api.get(endpoints[list], {
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
    }

    useEffect(() => {
        loadFilmes(page, activeList)
    }, [page, activeList])

    const handleBadgeClick = (list) => {
        setActiveList(list)
        setPage(1)
    }

    const handlePageChange = (newPage) => {
        setPage(newPage)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const renderPaginationButtons = () => {
        const buttons = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Botão "Anterior"
        buttons.push(
            <button
                key="prev"
                className="pagination-btn"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
            >
                &lt;
            </button>
        );

        // Primeira página
        if (startPage > 1) {
            buttons.push(
                <button
                    key="1"
                    className="pagination-btn"
                    onClick={() => handlePageChange(1)}
                >
                    1
                </button>
            );
            if (startPage > 2) {
                buttons.push(<span key="dots1" className="pagination-dots">...</span>);
            }
        }

        // Páginas do meio
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

        // Última página
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                buttons.push(<span key="dots2" className="pagination-dots">...</span>);
            }
            buttons.push(
                <button
                    key={totalPages}
                    className="pagination-btn"
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }

        // Botão "Próxima"
        buttons.push(
            <button
                key="next"
                className="pagination-btn"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
            >
                &gt;
            </button>
        );

        return buttons;
    };

    if (loading) {
        return <Skeleton />
    }

    return (
        <div className='container'>
            <AdsterraBanner />

            <h1 className="page-title">PipocaFLIX - Sua Janela para o Cinema</h1>

            <div className='badges'>
                <button
                    className={`badge ${activeList === 'now_playing' ? 'active' : ''}`}
                    onClick={() => handleBadgeClick('now_playing')}
                >Lançamentos</button>
                <button
                    className={`badge ${activeList === 'popular' ? 'active' : ''}`}
                    onClick={() => handleBadgeClick('popular')}
                >Populares</button>
                <button
                    className={`badge ${activeList === 'top_rated' ? 'active' : ''}`}
                    onClick={() => handleBadgeClick('top_rated')}
                >Mais bem avaliados</button>
                <button
                    className={`badge ${activeList === 'upcoming' ? 'active' : ''}`}
                    onClick={() => handleBadgeClick('upcoming')}
                >Em breve</button>
            </div>

            <div className="lista-filmes">
                {filmes.map((filme, index) => (
                    <React.Fragment key={filme.id}>
                        <article className="filme-card">
                            <div className="filme-poster">
                                <span className="vote-average">{filme.vote_average.toFixed(2)}</span>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                                    alt={filme.title}
                                    loading="lazy"
                                />
                            </div>
                            <strong className="filme-title">
                                {filme.title}
                            </strong>
                            <Link to={`/filme/${filme.id}`} className="btn-acessar">
                                <span>Ver Detalhes</span>
                            </Link>
                        </article>

                        {(index + 1) % 12 === 0 && (
                            <>
                                <AdsterraContainer />
                                <AdsterraBanner />
                            </>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className="pagination">
                {renderPaginationButtons()}
            </div>

            <AdsterraContainer />
            <AdsterraBanner />
            <AdSense adSlot="1234567890" format="fluid" style={{ display: 'block' }} />
        </div>
    )
}

export default Home