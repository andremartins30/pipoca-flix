import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import { Analytics } from './services/analytics'
import Header from './components/Header'

// Lazy loading dos componentes
const Home = lazy(() => import('./pages/Home'))
const Filme = lazy(() => import('./pages/Filme'))
const Erro = lazy(() => import('./pages/Erro'))
const Favoritos = lazy(() => import('./pages/Favoritos'))
const Search = lazy(() => import('./pages/Search'))
const Cinemas = lazy(() => import('./pages/Cinemas'))

// Componente de loading
const Loading = () => <div>Carregando...</div>

// Componente para rastrear mudanças de rota
const PageTracker = () => {
    const location = useLocation();

    useEffect(() => {
        Analytics.logPageView(location.pathname);
    }, [location]);

    return null;
};

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <PageTracker />
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/filme/:id' element={<Filme />} />
                    <Route path='/favoritos' element={<Favoritos />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/cinemas' element={<Cinemas />} />
                    <Route path='*' element={<Erro />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default RoutesApp;