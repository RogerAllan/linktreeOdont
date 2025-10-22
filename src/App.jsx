import { useState, useEffect } from 'react'
import './App.css'
import Bubble from './components/Bubble.jsx'
import logoImage from './assets/odontofun_logo_512x206.png' // <-- 1. ADICIONEI ISSO

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Imagens do carrossel (você pode substituir por imagens reais)
  const images = [
    'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=400&fit=crop'
  ]

  // Links dos botões
  const links = [
    {
      id: 1,
      title: '🏠 Visite Nosso Site',
      url: 'https://odontofun.com.br',
      color: '#2196F3'
    },
    {
      id: 2,
      title: '📅 Agende sua Consulta',
      url: 'https://odontofun.com.br/agendamento',
      color: '#FFC107'
    },
    {
      id: 3,
      title: '📸 Instagram',
      url: 'https://instagram.com/odontofun',
      color: '#E91E63'
    },
    {
      id: 4,
      title: '💬 WhatsApp',
      url: 'https://wa.me/5511999999999',
      color: '#4CAF50'
    },
    {
      id: 5,
      title: '📍 Nossa Localização',
      url: 'https://maps.google.com',
      color: '#FF5722'
    },
    {
      id: 6,
      title: '❓ Dúvidas Frequentes',
      url: 'https://odontofun.com.br/faq',
      color: '#9C27B0'
    }
  ]

  // Auto-play do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [images.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="app">
      {/* Enhanced Floating Bubbles Background usando componente */}
      {[...Array(15)].map((_, index) => (
        <Bubble key={index} index={index} totalBubbles={15} />
      ))}

      <div className="container">
        {/* Logo Section */}
        <div className="logo-section">
          {/* 2. ISSO FOI ALTERADO */}
          <img src={logoImage} alt="OdontoFun Logo" className="logo-image" />
          
        </div>

        {/* Carousel */}
        <div className="carousel-container">
          <div 
            className="carousel-wrapper"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="carousel-slide">
                <img src={image} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button className="carousel-btn prev" onClick={prevSlide}>
            ❮
          </button>
          <button className="carousel-btn next" onClick={nextSlide}>
            ❯
          </button>

          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={`indicator ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Links Buttons */}
        <div className="links-container">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-button"
              style={{ '--button-color': link.color }}
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="footer">
          <p>✨ Sorrisos felizes, crianças saudáveis! ✨</p>
        </div>
      </div>
    </div>
  )
}

export default App