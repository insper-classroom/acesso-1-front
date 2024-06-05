import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CadastraEvento } from './eventos/CadastraEventos'
import { ListaEventos } from './eventos/ListaEventos'
import { EditaEventos } from './eventos/EditaEventos'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './homepage'
import { NavBar } from './common/navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      
      <Router>
        <NavBar />
        <div className="App">
          <Routes>
            <Route path="/eventos" element={<ListaEventos />} />
            <Route path="/cadastraeventos" element={<CadastraEvento />} />
            <Route path="/editaeventos/:id" element={<EditaEventos />} />
            <Route path="/" element={<Home />} />
            <Route path="/nav" element={<NavBar />} />
          </Routes>
        </div>
      </Router>
     

    </>
  )
}

export default App
