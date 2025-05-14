import React, { useState, useEffect } from 'react'
import './cinemas.css'
import AdSense from '../../components/AdSense'

const Cinemas = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        // Simulação de carregamento
        setLoading(false);
    }, [])

    if (loading) {
        return <div className="loading">Carregando informações...</div>
    }

    return (
        <div className="cinemas-container">
            <div className="development-banner">
                <div className="development-icon">🚧</div>
                <h2>Recurso em Desenvolvimento</h2>
                <p>A funcionalidade de busca de cinemas próximos ainda está sendo implementada.</p>
                <p>Estamos trabalhando para trazer essa funcionalidade em breve!</p>
            </div>

            <div>
                <AdSense adSlot="8773604401" format="fluid" style={{ display: 'block' }} />
            </div>
        </div>
    )
}

export default Cinemas 