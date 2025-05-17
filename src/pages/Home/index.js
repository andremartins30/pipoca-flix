import React from 'react'
import { useEffect, useState, useCallback } from 'react'
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
    const [hasMore, setHasMore] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [activeList, setActiveList] = useState('now_playing') // Estado para a lista ativa

    const loadFilmes = useCallback(async (pageNumber, list) => {
        try {
            const response = await api.get(endpoints[list], {
                params: {
                    api_key: "45987c192cb22153a3fd72a71eee5003",
                    language: "pt-BR",
                    page: pageNumber,
                }
            })

            const newFilmes = response.data.results
            setFilmes(prev => pageNumber === 1 ? newFilmes : [...prev, ...newFilmes])
            setHasMore(pageNumber < response.data.total_pages)
            setLoadingMore(false)
        } catch (error) {
            console.error('Erro ao carregar filmes:', error)
            setLoadingMore(false)
        }
    }, [])

    useEffect(() => {
        loadFilmes(1, activeList)
        setLoading(false)
    }, [loadFilmes, activeList])

    const handleScroll = useCallback(() => {
        if (loadingMore || !hasMore) return

        const scrollHeight = document.documentElement.scrollHeight
        const scrollTop = window.scrollY
        const clientHeight = document.documentElement.clientHeight

        if (scrollTop + clientHeight >= scrollHeight - 100) {
            setLoadingMore(true)
            setPage(prev => prev + 1)
            loadFilmes(page + 1, activeList)
        }
    }, [loadingMore, hasMore, page, loadFilmes, activeList])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    const handleBadgeClick = (list) => {
        setActiveList(list)
        setPage(1)
        setFilmes([])
        setLoading(true)
    }

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
                {filmes.map((filme) => (
                    <article key={filme.id} className="filme-card">
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
                ))}
            </div>

            {loadingMore && (
                <div className="loading-more">
                    <div className="loading-spinner"></div>
                </div>
            )}
            <AdsterraContainer />
            <AdsterraBanner />
            <AdSense adSlot="1234567890" format="fluid" style={{ display: 'block' }} />
        </div>
    )
}

export default Home