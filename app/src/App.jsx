import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CadastraEvento } from './eventos/CadastraEventos'
import { ListaEventos } from './eventos/ListaEventos'
import { EditaEventos } from './eventos/EditaEventos'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ListaEventos />} />
          <Route path="/cadastraeventos" element={<CadastraEvento />} />
          <Route path="/editaeventos/:id" element={<EditaEventos />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
