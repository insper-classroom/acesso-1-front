// Importando useState do React para gerenciar estados locais
import { useState } from 'react'

// Importando logotipos
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// Importando o arquivo CSS para a aplicação
import './App.css'

// Importando componentes personalizados
import { CadastraEvento } from './eventos/CadastraEventos'
import { ListaEventos } from './eventos/ListaEventos'
import { EditaEventos } from './eventos/EditaEventos'
import { CadastraUser } from './usario/CadastraUsers'

// Importando componentes de roteamento do React Router
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Importando componentes adicionais
import { Home } from './homepage'
import { NavBar } from './common/navbar'
import { Login } from './usario/Login'

// Definindo o componente principal da aplicação
function App() {
  // Definindo um estado local chamado "count" com valor inicial 0
  const [count, setCount] = useState(0)

  // Renderizando a interface do usuário
  return (
    <>
      {/* Envolvendo a aplicação no componente Router para habilitar o roteamento */}
      <Router>
        {/* Definindo um layout flexível com altura de 100vh */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          {/* Definindo a área principal com overflow automático */}
          <div style={{ flex: 1, overflow: 'auto'}}>
            {/* Definindo as rotas da aplicação */}
            <Routes>
              {/* Rota para cadastrar usuários com um token */}
              <Route path="/cadastrausuarios/:token" element={<CadastraUser />} />
              {/* Rota para listar eventos */}
              <Route path="/eventos" element={<ListaEventos />} />
              {/* Rota para cadastrar novos eventos */}
              <Route path="/cadastraeventos" element={<CadastraEvento />} />
              {/* Rota para editar eventos, identificados por um ID */}
              <Route path="/editaeventos/:id" element={<EditaEventos />} />
              {/* Rota para a página inicial */}
              <Route path="/" element={<Home />} />
              {/* Rota para a barra de navegação */}
              <Route path="/nav" element={<NavBar />} />
              {/* Rota para a página de login */}
              <Route path='/login' element={<Login />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  )
}

// Exportando o componente App como padrão
export default App
