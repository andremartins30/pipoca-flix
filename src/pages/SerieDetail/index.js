import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tmdbApi } from '../../services/api';
import './serieDetail.css';
import { toast } from 'react-toastify';
import AdsterraPopUnder from '../../components/AdsterraPopUnder';
import AdsterraBanner from '../../components/AdsterraBanner';

const SerieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [serie, setSerie] = useState({});
    const [loading, setLoading] = useState(true);
    const [elenco, setElenco] = useState([]);

    useEffect(() => {
        const loadSerie = async () => {
            try {
                setLoading(true);
                const response = await tmdbApi.get(`tv/${id}`, {
                    params: {
                        api_key: "45987c192cb22153a3fd72a71eee5003",
                        language: "pt-BR",
                    },
                });
                setSerie(response.data);
                setLoading(false);
            } catch {
                navigate("/", { replace: true });
            }
        }

        async function loadElenco() {
            try {
                const response = await tmdbApi.get(`tv/${id}/credits`, {
                    params: {
                        api_key: "45987c192cb22153a3fd72a71eee5003",
                        language: "pt-BR",
                    },
                });
                setElenco(response.data.cast.slice(0, 8));
            } catch (error) {
                console.error("Erro ao carregar elenco:", error);
            }
        }

        loadSerie();
        loadElenco();
    }, [navigate, id]);

    function salvarSerie() {
        const minhaLista = localStorage.getItem("@pipocaflix-series");
        let seriesSalvas = JSON.parse(minhaLista) || [];

        const hasSerie = seriesSalvas.some((serieSalva) => serieSalva.id === serie.id);

        if (hasSerie) {
            toast.warn("Esta série já está na sua lista!");
            return;
        }

        seriesSalvas.push(serie);
        localStorage.setItem("@pipocaflix-series", JSON.stringify(seriesSalvas));
        toast.success("Série salva com sucesso!");
    }

    if (loading) {
        return (
            <div className='serie-info'>
                <h1>Carregando Detalhes...</h1>
            </div>
        );
    }

    return (
        <div className='serie-info'>
            <AdsterraPopUnder />
            <h1>{serie.name}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${serie.backdrop_path}`} alt={serie.name} />

            <h3>Sinopse</h3>
            <span>{serie.overview}</span>
            <strong>Gênero: {serie.genres.map((genre) => genre.name).join(', ')}</strong>

            <div className="avaliacao">
                <strong>Avaliação:</strong>
                <div className="rating-badge">
                    <span>{serie.vote_average.toFixed(1)}</span>
                    <small>/10</small>
                </div>
            </div>

            <div className='area-buttons'>
                <button onClick={salvarSerie}>Salvar</button>
                <button>
                    <a target="_blank" rel="external noreferrer" href={`https://youtube.com/results?search_query=${serie.name} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>

            <div className='elenco'>
                <h3>Elenco:</h3>
                <div className='elenco-grid'>
                    {elenco.map((ator) => (
                        <div key={ator.id} className='ator-card'>
                            <img src={`https://image.tmdb.org/t/p/w200${ator.profile_path}`} alt={ator.name} />
                            <strong>{ator.name}</strong>
                            <span>{ator.character}</span>
                        </div>
                    ))}
                </div>
            </div>
            <AdsterraBanner />
        </div>
    );
};

export default SerieDetail;