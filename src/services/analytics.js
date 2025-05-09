// Serviço de Analytics
const GA_MEASUREMENT_ID = 'G-XWS8JK6PLK'

// Função para inicializar o GA4
const initializeGA = () => {
    // Carrega o script do GA4
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    script.async = true
    document.head.appendChild(script)

    // Inicializa o GA4
    window.dataLayer = window.dataLayer || []
    function gtag() {
        window.dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', GA_MEASUREMENT_ID)
}

// Função para registrar visualização de página
const logPageView = (path) => {
    if (window.gtag) {
        window.gtag('event', 'page_view', {
            page_path: path,
            page_title: document.title,
            page_location: window.location.href
        })
    }
}

// Inicializa o GA4 quando o serviço é importado
if (typeof window !== 'undefined') {
    initializeGA()
}

export const Analytics = {
    logPageView,
} 