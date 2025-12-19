import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'
import Bubble from './components/Bubble.jsx'
import logoImage from './assets/odontofun_logo_512x206.png'
import logoFun from './assets/logo2.png' // Imagem do rodapé

// IMPORTANTE: Certifique-se que o arquivo existe em src/assets/musica.mp3
import bgMusic from './assets/musica.mp3' 

// Imagens do carrossel
import image1 from './assets/2.jpg'
import image2 from './assets/1.jpg'
import image3 from './assets/3.jpg'
import image4 from './assets/4.jpg'
import image5 from './assets/5.jpg'
import image6 from './assets/6.jpg'
import image7 from './assets/7.jpg'

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTouch, setIsTouch] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  
  // Estado da música
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const images = [image1, image2, image3, image4, image5, image6, image7]

  const links = [
    {
      id: 1,
      title: 'Agendar uma consulta',
      // ATUALIZADO: Adicionado o texto personalizado na URL
      url: 'https://wa.me/554733630178?text=Vim%20pelo%20instagram%20e%20gostaria%20de%20agendar%20uma%20consulta',
      color: '#6abf4b'
    },
    {
      id: 2,
      title: 'Conheça a Odonto Fun ',
      url: 'https://lp.odontofunkids.com.br/odontopediatria',
      color: '#47bfe1'
    },
    {
      id: 3,
      title: 'Urgência? Ligue para nós!',
      url: 'tel:+554733630178',
      color: '#e590db'
    },
    {
      id: 4,
      title: 'Método Odonto Fun (p/ dentistas)',
      url: 'https://metodoodontofun.com.br',
      color: '#e7a23c'
    },
  ]

  // --- LÓGICA DE ÁUDIO COM AUTOPLAY ---
  
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(e => console.log("Erro ao tocar:", e))
    }
  }

  // Tenta tocar ao carregar. Se falhar (bloqueio do navegador),
  // espera o primeiro clique do usuário para iniciar.
  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.5 // Define volume inicial (50%)
          await audioRef.current.play()
          setIsPlaying(true)
        }
      } catch (err) {
        console.log("Autoplay bloqueado pelo navegador. Aguardando interação...")
        // Adiciona um listener para tocar no primeiro clique/toque
        const enableAudio = () => {
            if (audioRef.current) {
                audioRef.current.play()
                setIsPlaying(true)
                // Remove os listeners após conseguir tocar
                document.removeEventListener('click', enableAudio)
                document.removeEventListener('touchstart', enableAudio)
            }
        }
        document.addEventListener('click', enableAudio)
        document.addEventListener('touchstart', enableAudio)
      }
    }

    playAudio()
  }, [])
  
  // --- FIM DA LÓGICA DE ÁUDIO ---

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index)
  }, [])

  // Auto-play do carrossel
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [nextSlide])

  // Detecta se é touch device
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  // Swipe handlers para mobile
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  // Calcula número de bolhas baseado no viewport
  const getBubbleCount = () => {
    if (typeof window === 'undefined') return 10
    const width = window.innerWidth
    if (width < 400) return 8
    if (width < 600) return 10
    return 15
  }

  const [bubbleCount, setBubbleCount] = useState(15)

  useEffect(() => {
    setBubbleCount(getBubbleCount())
    
    const handleResize = () => {
      setBubbleCount(getBubbleCount())
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="app">
      {/* Elemento de Áudio Invisível */}
      <audio ref={audioRef} src={bgMusic} loop />

      {/* Botão de Controle de Música Flutuante */}
      <button 
        className="music-toggle-btn"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pausar música" : "Tocar música"}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          color: '#e590db' 
        }}
      >
        {isPlaying ? (
          // Ícone de Pause
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          // Ícone de Nota Musical
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        )}
      </button>

      {/* Bolhas decorativas */}
      {[...Array(bubbleCount)].map((_, index) => (
        <Bubble key={index} index={index} totalBubbles={bubbleCount} />
      ))}

      <div className="container">
        {/* Logo */}
        <div className="logo-section">
          <img 
            src={logoImage} 
            alt="OdontoFun Logo" 
            className="logo-image"
            loading="eager"
            width="512"
            height="206"
          />
        </div>

        {/* Carousel com suporte a swipe */}
        <div 
          className="carousel-container"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div 
            className="carousel-wrapper"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="carousel-slide">
                <img 
                  src={image} 
                  alt={`Slide ${index + 1}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  draggable="false"
                />
              </div>
            ))}
          </div>

          {/* Controls */}
          <button 
            className="carousel-btn prev" 
            onClick={prevSlide}
            aria-label="Slide anterior"
          >
            ❮
          </button>
          <button 
            className="carousel-btn next" 
            onClick={nextSlide}
            aria-label="Próximo slide"
          >
            ❯
          </button>

          {/* Indicators */}
          <div className="carousel-indicators" role="tablist">
            {images.map((_, index) => (
              <button
                key={index}
                className={`indicator ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir para slide ${index + 1}`}
                aria-selected={currentSlide === index}
                role="tab"
              />
            ))}
          </div>
        </div>

        {/* Botões de Link */}
        <nav className="links-container" aria-label="Links principais">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="link-button"
              style={{ '--button-color': link.color }}
            >
              {link.title}
            </a>
          ))}
        </nav>

        {/* Rodapé */}
        <footer className="footer">
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            Tenha um dia{' '}
            <img 
              src={logoFun} 
              alt="FUN" 
              style={{ height: '1.3em', marginTop: '-3px' }} 
            />

          </p>
        </footer>
      </div>
    </div>
  )
}

export default App