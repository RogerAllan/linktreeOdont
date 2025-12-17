import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Bubble from './components/Bubble.jsx'
import logoImage from './assets/odontofun_logo_512x206.png'

// Imagens do carrossel
import image1 from './assets/1.jpg'
import image2 from './assets/2.jpg'
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

  const images = [image1, image2, image3, image4, image5, image6, image7]

  const links = [
    {
      id: 1,
      title: 'Agendar uma consulta',
      url: 'https://wa.me/554733630178',
      color: '#123675'
    },
    {
      id: 3,
      title: 'Método Odonto Fun',
      url: 'https://metodoodontofun.com.br',
      color: '#e7a23b'
    },
    {
      id: 2,
      title: 'Visite Nosso Site',
      url: 'https://lp.odontofunkids.com.br/odontopediatria',
      color: '#2196F3'
    },
    {
      id: 4,
      title: 'Urgência? Ligue para nós!',
      url: 'tel:+554733630178',
      color: '#FF5722'
    },
  ]

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

          {/* Controls - ocultos ou menores em touch devices */}
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
          <p>
            Tenha um dia{' '}
            <span style={{ color: '#6abf4b' }}>F</span>
            <span style={{ color: '#e7a23b' }}>U</span>
            <span style={{ color: '#E590DB' }}>N</span>
            <span style={{ color: '#123675' }}>!</span>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App