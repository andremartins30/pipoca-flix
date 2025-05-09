import React, { useState, useEffect } from 'react'
import './cinemas.css'

const Cinemas = () => {
    const [location, setLocation] = useState(null)
    const [cinemas, setCinemas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        })
                    },
                    (error) => {
                        setError('Não foi possível obter sua localização. Por favor, verifique as permissões do navegador.')
                        setLoading(false)
                    }
                )
            } else {
                setError('Seu navegador não suporta geolocalização.')
                setLoading(false)
            }
        }

        getLocation()
    }, [])

    useEffect(() => {
        const fetchCinemas = async () => {
            if (!location) return

            try {
                // Aqui você implementaria a chamada para a API de cinemas
                // Este é um exemplo simulado
                const mockCinemas = [
                    { id: 1, name: 'Cinema A', distance: '1.2 km' },
                    { id: 2, name: 'Cinema B', distance: '2.5 km' },
                    { id: 3, name: 'Cinema C', distance: '3.1 km' }
                ]
                setCinemas(mockCinemas)
            } catch (error) {
                setError('Erro ao buscar cinemas próximos.')
            } finally {
                setLoading(false)
            }
        }

        if (location) {
            fetchCinemas()
        }
    }, [location])

    if (loading) {
        return <div className="loading">Carregando cinemas próximos...</div>
    }

    if (error) {
        return <div className="error">{error}</div>
    }

    return (
        <div className="cinemas-container">
            <h1>Cinemas Próximos</h1>
            <div className="cinemas-list">
                {cinemas.map((cinema) => (
                    <div key={cinema.id} className="cinema-card">
                        <h3>{cinema.name}</h3>
                        <p>Distância: {cinema.distance}</p>
                        <button className="btn-directions">Como Chegar</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cinemas 