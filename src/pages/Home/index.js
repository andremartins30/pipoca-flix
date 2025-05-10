import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import Skeleton from '../../components/Skeleton'
import AdSense from '../../components/AdSense'
import './home.css'

const Home = () => {
    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)

    const loadFilmes = useCallback(async (pageNumber) => {
        try {
            const response = await api.get('movie/now_playing', {
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
        loadFilmes(1)
        setLoading(false)
    }, [loadFilmes])

    const handleScroll = useCallback(() => {
        if (loadingMore || !hasMore) return

        const scrollHeight = document.documentElement.scrollHeight
        const scrollTop = window.scrollY
        const clientHeight = document.documentElement.clientHeight

        if (scrollTop + clientHeight >= scrollHeight - 100) {
            setLoadingMore(true)
            setPage(prev => prev + 1)
            loadFilmes(page + 1)
        }
    }, [loadingMore, hasMore, page, loadFilmes])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    if (loading) {
        return <Skeleton />
    } return (
        <div className='container'>
            <AdSense adSlot="2797177392" />

            <div className='lista-filmes'>
                {filmes.map((filme) => (
                    <article key={filme.id} className="filme-card">
                        <div className="filme-poster">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                                alt={filme.title}
                                loading="lazy"
                            />
                        </div>                        <strong className="filme-title">
                            {filme.title}
                        </strong>
                        <Link to={`/filme/${filme.id}`} className="btn-acessar">
                            <span>Ver Detalhes</span>
                        </Link>
                    </article>
                ))}
            </div>

            <AdSense adSlot="1234567890" format="fluid" style={{ display: 'block' }} />
        </div>
    )
}

export default Home