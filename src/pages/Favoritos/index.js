import { useState, useEffect } from "react"
import React from 'react'
import { Link } from "react-router-dom"
import "./favoritos.css"
import { toast } from "react-toastify"

function Favoritos() {
    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFavorites = () => {
            setLoading(true)
            const minhaLista = localStorage.getItem("@pipocaflix")
            setFilmes(JSON.parse(minhaLista) || [])
            setLoading(false)
        }

        fetchFavorites()
    }, [])

    function excluirFilme(id) {
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id)
        })

        setFilmes(filtroFilmes)
        localStorage.setItem("@pipocaflix", JSON.stringify(filtroFilmes))
        toast.success("Filme removido com sucesso!")
    }

    if (loading) {
        return (
            <div className="meus-filmes">
                <h1>Meus Filmes</h1>
                <div className="loading">
                    <div className="loading-spinner"></div>
                </div>
            </div>
        )
    } return (
        <div className="meus-filmes">
            <h1>Meus Filmes</h1>

            {filmes.length === 0 ? (
                <div className="empty-favorites">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
                    </svg>
                    <span>Você ainda não possui nenhum filme salvo!</span>
                    <Link to="/">Voltar para a Home</Link>
                </div>
            ) : (
                <ul className="filmes-list">                {filmes.map((item) => {
                    return (
                        <li key={item.id} className="filme-item">
                            <div className="filme-info">
                                {item.poster_path && (
                                    <img src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                                        alt={item.title}
                                        className="filme-poster"
                                        loading="lazy"
                                    />
                                )}
                                <span>{item.title}</span>
                            </div>
                            <div className="filme-actions">
                                <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
                </ul>
            )}
        </div>
    )
}

export default Favoritos