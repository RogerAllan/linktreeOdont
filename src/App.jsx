import { useState, useEffect } from 'react'
import './App.css'
import Bubble from './components/Bubble.jsx'
import logoImage from './assets/odontofun_logo_512x206.png'

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Imagens do carrossel
  const images = [
    '../src/assets/1.jpg',
    '../src/assets/2.jpg',
    '../src/assets/3.jpg',
    '../src/assets/4.jpg',
    '../src/assets/5.jpg',
    '../src/assets/6.jpg',
    '../src/assets/7.jpg'
  ]

  // Links dos botões
  const links = [
    {
      id: 1,
      title: 'Visite Nosso Site',
      url: 'https://odontofun.com.br',
      color: '#2196F3'
    },
    {
      id: 2,
      title: 'Método Odonto Fun',
      url: 'https://metodoodontofun.com.br/masterclass/?fbclid=PAZXh0bgNhZW0CMTEAAafIUFOmMhvAzvFCEKawkQ3AiVeL-VQYnkef5zIPPkF6BbQeKZPZXzNQg1Jjjw_aem_vGuuqR02Wcqwk508Z1UoQg',
      color: '#e7a23b'
    },
    {
      id: 3,
      title: 'Quero agendar uma consulta',
      url: 'https://wa.me/5547933630178',
      color: '#123675'
    },
    {
      id: 4,
      title: 'Urgência? Ligue para nós!',
      url: 'tel:+554733630178', // <-- 🔥 ALTERADO AQUI
      color: '#FF5722'
    },
    {
      id: 5,
      title: 'Administrativo',
      url: 'https://wa.me/554784930178',
      color: '#4CAF50'
    },
    {
      id: 6,
      title: 'Dúvidas Frequentes',
      url: 'https://odontofun.com.br/duvidas-frequentes/',
      color: '#E590DB'
    }
  ]

  // Auto-play do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [images.length])

  const goToSlide = (index) => setCurrentSlide(index)
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="app">
      {[...Array(15)].map((_, index) => (
        <Bubble key={index} index={index} totalBubbles={15} />
      ))}

      <div className="container">
        {/* Logo */}
        <div className="logo-section">
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

          {/* Controls */}
          <button className="carousel-btn prev" onClick={prevSlide}>❮</button>
          <button className="carousel-btn next" onClick={nextSlide}>❯</button>

          {/* Indicators */}
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

        {/* Botões */}
        <div className="links-container">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="link-button"
              style={{ '--button-color': link.color }}
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* Rodapé */}
        <div className="footer">
          <p>✨ Quero te ver sorrir ✨</p>
        </div>
      </div>
    </div>
  )
}

export default App
