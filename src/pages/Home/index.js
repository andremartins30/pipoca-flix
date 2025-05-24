import React, { useEffect, useState, useCallback } from 'react'
import { tmdbApi } from '../../services/api'
import { rawgApi } from '../../services/api'
import { Link } from 'react-router-dom'
import Skeleton from '../../components/Skeleton'
import { Helmet } from 'react-helmet'
import ContentBlock from '../../components/ContentBlock'
import './home.css'
import AdsterraBanner from '../../components/AdsterraBanner'
import AdsterraContainer from '../../components/AdsterraContainer'
import AdsterraTopBanner from '../../components/AdsterraTopBanner'

const endpoints = {
    now_playing: 'movie/now_playing',
    popular: 'movie/popular',
    top_rated: 'movie/top_rated',
    upcoming: 'movie/upcoming',
    popular_series: 'trending/tv/week'
}

const getPageTitle = (activeList) => {
    const titles = {
        now_playing: 'Filmes em Cartaz | PipocaFLIX',
        popular: 'Filmes Populares | PipocaFLIX',
        top_rated: 'Filmes Mais Bem Avaliados | PipocaFLIX',
        upcoming: 'Filmes em Breve | PipocaFLIX'
    };
    return titles[activeList] || 'PipocaFLIX - Sua Janela para o Cinema';
};

const getPageDescription = (activeList) => {
    const descriptions = {
        now_playing: 'Assista aos melhores filmes em cartaz. Encontre os lançamentos mais recentes do cinema com avaliações, sinopses e trailers.',
        popular: 'Descubra os filmes mais populares do momento. Uma seleção especial dos títulos mais assistidos e comentados.',
        top_rated: 'Confira os filmes mais bem avaliados pela crítica e pelo público. Uma curadoria especial dos melhores títulos do cinema.',
        upcoming: 'Veja os próximos lançamentos do cinema. Fique por dentro dos filmes que estão chegando aos cinemas.'
    };
    return descriptions[activeList] || 'PipocaFLIX - Sua plataforma para descobrir os melhores filmes. Encontre lançamentos, filmes populares e mais bem avaliados com avaliações, sinopses e trailers.';
};

const Home = () => {
    const [filmes, setFilmes] = useState([])
    const [series, setSeries] = useState([])
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)

    const loadContent = useCallback(async () => {
        try {
            setLoading(true)

            // Carregar filmes
            const filmesResponse = await tmdbApi.get(endpoints.now_playing, {
                params: {
                    api_key: "45987c192cb22153a3fd72a71eee5003",
                    language: "pt-BR",
                    page: 1,
                }
            })
            setFilmes(filmesResponse.data.results.slice(0, 20))

            // Carregar séries
            const seriesResponse = await tmdbApi.get(endpoints.popular_series, {
                params: {
                    api_key: "45987c192cb22153a3fd72a71eee5003",
                    language: "pt-BR",
                    page: 1,
                }
            })
            setSeries(seriesResponse.data.results.slice(0, 10))

            // Carregar games
            try {
                const gamesResponse = await rawgApi.get('games', {
                    params: {
                        key: "b028504862e94a9696a210141ee95315",
                        page: 1,
                        page_size: 10,
                        language: "pt-BR",
                    }
                });
                setGames(gamesResponse.data.results);
            } catch (error) {
                console.error('Erro ao carregar jogos:', error);
                setGames([]);
            }

            setLoading(false)
        } catch (error) {
            console.error('Erro ao carregar conteúdo:', error)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadContent()
    }, [loadContent])

    const renderFilme = (filme, index) => (
        <React.Fragment key={filme.id}>
            <article className="filme-card">
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
            {(index + 1) % 19 === 0 && (
                <div>
                    <AdsterraContainer />
                </div>
            )}
        </React.Fragment>
    )

    const renderSerie = (serie) => (
        <article key={serie.id} className="filme-card">
            <div className="filme-poster">
                <span className="vote-average" aria-label={`Avaliação: ${serie.vote_average.toFixed(2)}`}>
                    {serie.vote_average.toFixed(2)}
                </span>
                <img
                    src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                    alt={`Poster da série ${serie.name}`}
                    loading="lazy"
                    width="500"
                    height="750"
                />
            </div>
            <strong className="filme-title">
                {serie.name}
            </strong>
            <Link to={`/serie/${serie.id}`} className="btn-acessar" aria-label={`Ver detalhes da série ${serie.name}`}>
                <span>Ver Detalhes</span>
            </Link>
        </article>
    )

    const renderGame = (game) => (
        <article key={game.id} className="filme-card">
            <div className="filme-poster">
                {game.metacritic && (
                    <span className={`vote-average ${game.metacritic >= 75 ? 'high' : game.metacritic >= 50 ? 'medium' : 'low'}`}>
                        {game.metacritic}
                    </span>
                )}
                <img
                    src={game.background_image}
                    alt={game.name}
                    loading="lazy"
                />
            </div>
            <strong className="filme-title">{game.name}</strong>
            <div className="game-info">
                <span className="game-platforms">
                    {game.platforms?.slice(0, 3).map(platform => platform.platform.name).join(', ')}
                </span>
            </div>
            <Link to={`/game/${game.id}`} className="btn-acessar" aria-label={`Ver detalhes do jogo ${game.name}`}>
                <span>Ver Detalhes</span>
            </Link>
        </article>
    )

    if (loading) {
        return <Skeleton />
    }

    return (
        <div className='container'>
            <Helmet>
                <title>PipocaFLIX - Sua Janela para o Entretenimento</title>
                <meta name="description" content="Descubra os melhores filmes, séries e jogos. Encontre lançamentos, títulos populares e mais bem avaliados com avaliações, sinopses e trailers." />
                <meta name="keywords" content="filmes, séries, jogos, cinema, streaming, lançamentos, entretenimento" />
                <meta property="og:title" content="PipocaFLIX - Sua Janela para o Entretenimento" />
                <meta property="og:description" content="Descubra os melhores filmes, séries e jogos. Encontre lançamentos, títulos populares e mais bem avaliados com avaliações, sinopses e trailers." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            <h1 className="page-title">PipocaFLIX - Sua Janela para o Entretenimento</h1>

            <AdsterraTopBanner />

            <ContentBlock
                title="Filmes em Destaque"
                items={filmes}
                linkTo="/filmes"
                renderItem={(filme, index) => (
                    <React.Fragment key={filme.id}>
                        {renderFilme(filme)}
                        {index === filmes.length - 1 && (
                            <div className="adsterra-container">
                                <AdsterraContainer />
                            </div>
                        )}
                    </React.Fragment>
                )}
            />

            <ContentBlock
                title="Séries Populares"
                items={series}
                linkTo="/series"
                renderItem={renderSerie}
            />

            <ContentBlock
                title="Jogos em Alta"
                items={games}
                linkTo="/games"
                renderItem={renderGame}
            />

            <div className="ad-bottom-container">
                <AdsterraBanner />
            </div>
        </div>
    )
}

export default Home