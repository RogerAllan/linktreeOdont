/* eslint-disable no-irregular-whitespace */
import { useEffect, useState } from 'react'
import './Bubble.css'

const Bubble = ({ index, totalBubbles }) => {
  const [style, setStyle] = useState({})

  useEffect(() => {
    // Gerar propriedades aleatórias para cada bolha
    const size = 35 + Math.random() * 60 // 35px a 95px
    const left = (index / totalBubbles) * 200 + (Math.random() * 8 - 4) // Distribuição melhor
    
    // 💡 Aumente o duration para deixar a animação mais lenta
    const duration = 6 + Math.random() * 15 // 15s a 30s (era 10s a 18s)
    
    // 💡 Aumente o delay para atrasar o início e espaçar mais o aparecimento
    const delay = Math.random() * 25 // 0s a 40s (era 0s a 25s)
    
    const xOffset = Math.random() * 80 - 40 // -40px a 40px
    
    // Cores da paleta OdontoFun
    const colors = [
      'rgba(33, 150, 243, 0.25)',   // Azul
      'rgba(100, 181, 246, 0.25)',  // Azul claro
      'rgba(7, 218, 255, 0.25)',    // Amarelo - **Naota**: Isso parece ser um erro de cor na sua paleta de comentário, mas mantive o valor.
      // eslint-disable-next-line no-irregular-whitespace
      'rgba(255, 152, 0, 0.25)',    // Laranja
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