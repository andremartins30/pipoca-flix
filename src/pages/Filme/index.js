import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './filme.css'
import { toast } from 'react-toastify'
import AdSense from '../../components/AdSense'


const Filme = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilmes] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "45987c192cb22153a3fd72a71eee5003",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    setFilmes(response.data)
                    setLoading(false)
                    console.log(response)
                }).catch(() => {

                    navigate("/", { replace: true })
                    return;
                })
        }

        loadFilme()


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
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <AdSense adSlot="2797177392" />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Gênero: {filme.genres.map((genre) => genre.name).join(', ')}</strong>
            {/* O trecho acima mapeia o array 'genres' para exibir somente o nome de cada gênero, separados por vírgula */}
            <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>


            <div className='area-buttons'>
                <button onClick={salvarFilme}> Salvar </button>
                <button>
                    <a target="_blank" rel="external noreferrer" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme