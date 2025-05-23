import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rawgApi } from '../../services/api';
import './gameDetail.css';
import { toast } from 'react-toastify';
import AdsterraPopUnder from '../../components/AdsterraPopUnder';
import AdsterraBanner from '../../components/AdsterraBanner';
import { Helmet } from 'react-helmet';
import Modal from '../../components/Modal';

const GameDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState({});
    const [loading, setLoading] = useState(true);
    const [screenshots, setScreenshots] = useState([]);
    const [selectedScreenshot, setSelectedScreenshot] = useState(null);

    useEffect(() => {
        const loadGame = async () => {
            try {
                setLoading(true);
                const response = await rawgApi.get(`games/${id}`, {
                    params: {
                        key: "b028504862e94a9696a210141ee95315",
                    },
                });
                setGame(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar jogo:', error);
                navigate("/games", { replace: true });
            }
        };

        const loadScreenshots = async () => {
            try {
                const response = await rawgApi.get(`games/${id}/screenshots`, {
                    params: {
                        key: "b028504862e94a9696a210141ee95315",
                    },
                });
                setScreenshots(response.data.results);
            } catch (error) {
                console.error('Erro ao carregar screenshots:', error);
            }
        };

        loadGame();
        loadScreenshots();
    }, [navigate, id]);

    function salvarJogo() {
        const minhaLista = localStorage.getItem("@pipocaflix-games");
        let jogosSalvos = JSON.parse(minhaLista) || [];

        const hasJogo = jogosSalvos.some((jogoSalvo) => jogoSalvo.id === game.id);

        if (hasJogo) {
            toast.warn("Este jogo já está na sua lista!");
            return;
        }

        jogosSalvos.push(game);
        localStorage.setItem("@pipocaflix-games", JSON.stringify(jogosSalvos));
        toast.success("Jogo salvo com sucesso!");
    }

    if (loading) {
        return (
            <div className='game-info'>
                <h1>Carregando Detalhes...</h1>
            </div>
        );
    }

    return (
        <div className='game-info'>
            <Helmet>
                <title>{`${game.name} | PipocaFLIX Games`}</title>
                <meta name="description" content={`${game.name} - ${game.description_raw?.slice(0, 160)}...`} />
                <meta name="keywords" content={`${game.name}, jogos, ${game.genres?.map(genre => genre.name).join(', ')}, ${game.platforms?.map(platform => platform.platform.name).join(', ')}`} />
                <meta property="og:title" content={`${game.name} | PipocaFLIX Games`} />
                <meta property="og:description" content={game.description_raw?.slice(0, 160)} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content={game.background_image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${game.name} | PipocaFLIX Games`} />
                <meta name="twitter:description" content={game.description_raw?.slice(0, 160)} />
                <meta name="twitter:image" content={game.background_image} />
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            <AdsterraPopUnder />
            <h1>{game.name}</h1>
            <img src={game.background_image} alt={`Capa do jogo ${game.name}`} />

            <h3>Descrição</h3>
            <span>{game.description_raw}</span>

            <div className="game-details">
                <div className="detail-item">
                    <strong>Gêneros:</strong>
                    <span>{game.genres?.map(genre => genre.name).join(', ')}</span>
                </div>

                <div className="detail-item">
                    <strong>Plataformas:</strong>
                    <span>{game.platforms?.map(platform => platform.platform.name).join(', ')}</span>
                </div>

                {game.metacritic && (
                    <div className="detail-item">
                        <strong>Metacritic:</strong>
                        <span className={`metacritic-score ${game.metacritic >= 75 ? 'high' : game.metacritic >= 50 ? 'medium' : 'low'}`}>
                            {game.metacritic}
                        </span>
                    </div>
                )}

                {game.released && (
                    <div className="detail-item">
                        <strong>Data de Lançamento:</strong>
                        <span>{new Date(game.released).toLocaleDateString('pt-BR')}</span>
                    </div>
                )}

                {game.developers?.length > 0 && (
                    <div className="detail-item">
                        <strong>Desenvolvedor:</strong>
                        <span>{game.developers.map(dev => dev.name).join(', ')}</span>
                    </div>
                )}

                {game.publishers?.length > 0 && (
                    <div className="detail-item">
                        <strong>Publicadora:</strong>
                        <span>{game.publishers.map(pub => pub.name).join(', ')}</span>
                    </div>
                )}
            </div>

            <div className='area-buttons'>
                <button onClick={salvarJogo}>Salvar</button>
                <button>
                    <a target="_blank" rel="external noreferrer" href={`https://youtube.com/results?search_query=${game.name} Gameplay`}>
                        Gameplay
                    </a>
                </button>
            </div>

            {screenshots.length > 0 && (
                <div className='screenshots'>
                    <h3>Screenshots</h3>
                    <div className='screenshots-grid'>
                        {screenshots.map((screenshot) => (
                            <div
                                key={screenshot.id}
                                className='screenshot-card'
                                onClick={() => setSelectedScreenshot(screenshot)}
                            >
                                <img
                                    src={screenshot.image}
                                    alt={`Screenshot de ${game.name}`}
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Modal
                isOpen={!!selectedScreenshot}
                onClose={() => setSelectedScreenshot(null)}
            >
                {selectedScreenshot && (
                    <img
                        src={selectedScreenshot.image}
                        alt={`Screenshot de ${game.name}`}
                        className="modal-image"
                    />
                )}
            </Modal>

            <AdsterraBanner />
        </div>
    );
};

export default GameDetail; 