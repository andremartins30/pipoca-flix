import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { tmdbApi } from '../../services/api'
import './filme.css'
import { toast } from 'react-toastify'
import SimilarMovies from '../../components/SimilarMovies'
// import AdsterraContainer from '../../components/AdsterraContainer'
import AdsterraPopUnder from '../../components/AdsterraPopUnder'
import AdsterraBanner from '../../components/AdsterraBanner'
// import AdSense from '../../components/AdSense'

const Filme = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilmes] = useState({})
    const [loading, setLoading] = useState(true)
    const [elenco, setElenco] = useState([]) // Estado para armazenar o elenco

    useEffect(() => {
        const loadFilme = async () => {
            try {
                setLoading(true);
                const response = await tmdbApi.get(`movie/${id}`, {
                    params: {
                        api_key: "45987c192cb22153a3fd72a71eee5003",
                        language: "pt-BR",
                    },
                });
                setFilmes(response.data)
                setLoading(false)
            } catch (error) {
                navigate("/", { replace: true })
                return;
            }
        }

        async function loadElenco() {
            await tmdbApi.get(`/movie/${id}/credits`, {
                params: {
                    api_key: "45987c192cb22153a3fd72a71eee5003",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    setElenco(response.data.cast.slice(0, 8)) // Limitando a 6 primeiros
                }).catch((error) => {
                    console.error("Erro ao carregar elenco:", error)
                })
        }

        loadFilme()
        loadElenco()
    }, [navigate, id])



    function salvarFilme() {
        const minhaLista = localStorage.getItem("@pipocaflix")

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

        if (hasFilme) {
            toast.warn("Este filme já está na sua lista!")
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@pipocaflix", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucessso!")

    }

    if (loading) {
        return (
            <div className='filme-info'>
                <h1> Carregando Detalhes...</h1>
            </div>
        )
    }

    return (

        <div className='filme-info'>
            <AdsterraPopUnder />
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />



            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Gênero: {filme.genres.map((genre) => genre.name).join(', ')}</strong>
            {/* O trecho acima mapeia o array 'genres' para exibir somente o nome de cada gênero, separados por vírgula */}

            <div className="avaliacao">
                <strong>Avaliação:</strong>
                <div className="rating-badge">
                    <span>{filme.vote_average.toFixed(1)}</span>
                    <small>/10</small>
                </div>
            </div>


            <div className='area-buttons'>
                <button onClick={salvarFilme}> Salvar </button>
                <button>
                    <a target="_blank" rel="external noreferrer" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>



            <div className='elenco'>
                <h3>Elenco: </h3>
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

            <div className='sugestoes'>
                <div className='sugestoes-grid'>
                    <SimilarMovies movieId={filme.id} />
                </div>
            </div>

            <AdsterraBanner />
        </div>
    )
}

export default Filme