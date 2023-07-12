import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import './filme.css'


const Filme = () => {

    const {id} = useParams();
    const [filme, setFilmes] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilme(){
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
            }).catch(()=>{
                console.log("Filme não encontrado")
            })
        }

        loadFilme()

        return () => {
            console.log('COMPONENTE DESMONTADO')
        }
    }, [])


    if(loading){
        return(
            <div className='filme-info'>
                <h1> Carregando Detalhes...</h1>
            </div>
        )
        }

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>


            <div className='area-buttons'>
                <button> Salvar </button>
                <button>
                    <a href="/">
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme