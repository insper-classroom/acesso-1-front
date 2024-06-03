import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CadastraEvento } from './eventos/CadastraEventos'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <CadastraEvento/>
    </>
  )
}

export default App
