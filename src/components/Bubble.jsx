import { useEffect, useState } from 'react'
import './Bubble.css'

const Bubble = ({ index, totalBubbles }) => {
  const [style, setStyle] = useState({})

  useEffect(() => {
    // Gerar propriedades aleatórias para cada bolha
    const size = 35 + Math.random() * 60 // 35px a 95px
    const left = (index / totalBubbles) * 100 + (Math.random() * 8 - 4) // Distribuição melhor
    const duration = 10 + Math.random() * 8 // 10s a 18s
    const delay = Math.random() * 8 // 0s a 8s
    const xOffset = Math.random() * 80 - 40 // -40px a 40px
    
    // Cores da paleta OdontoFun
    const colors = [
      'rgba(33, 150, 243, 0.25)',   // Azul
      'rgba(100, 181, 246, 0.25)',  // Azul claro
      'rgba(255, 193, 7, 0.25)',    // Amarelo
      'rgba(255, 152, 0, 0.25)',    // Laranja
    ]
    
    const color = colors[Math.floor(Math.random() * colors.length)]

    setStyle({
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      backgroundColor: color,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      '--x-offset': `${xOffset}px`,
    })
  }, [index, totalBubbles])

  return <div className="bubble-enhanced" style={style}></div>
}

export default Bubble