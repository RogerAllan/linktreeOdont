import { useState, useEffect } from 'react'
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

  // 💡 Use as variáveis importadas no array de imagens
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7
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
      url: 'https://wa.me/554733630178',
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
          <p> Tenha um dia <span style={{ color: '#6abf4b', fontSize:'1.5em' }}>F</span>
            <span style={{ color: '#e7a23b', fontSize:'1.5em' }}>U</span>
            <span style={{ color: '#E590DB', fontSize:'1.5em' }}>N</span>
            <span style={{ color: '#123675', fontSize:'1.5em' }}>!</span> </p>
          
        </div>
      </div>
    </div>
  )
}

export default App
