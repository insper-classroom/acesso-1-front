import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CadastraEvento } from './eventos/CadastraEventos'
import { ListaEventos } from './eventos/ListaEventos'
import { EditaEventos } from './eventos/EditaEventos'
import { CadastraUser } from './usario/CadastraUsers'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home } from './homepage'
import { NavBar } from './common/navbar'
import { Login } from './usario/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      
      <Router>
        
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <div style={{ flex: 1, overflow: 'auto'}}>
            <Routes>
              <Route path="/cadastrausuarios/:token" element={<CadastraUser />} />
              <Route path="/eventos" element={<ListaEventos />} />
              <Route path="/cadastraeventos" element={<CadastraEvento />} />
              <Route path="/editaeventos/:id" element={<EditaEventos />} />
              <Route path="/" element={<Home />} />
              <Route path="/nav" element={<NavBar />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </div>
        </div>
      </Router>
     

    </>
  )
}

export default App
