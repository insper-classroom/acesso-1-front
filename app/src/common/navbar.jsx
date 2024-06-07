import React, { useState } from 'react';
// Importações de componentes do Material UI
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Grid, AppBar, Toolbar, IconButton, Box, Menu, MenuList, MenuItem } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

// Estilização de componentes usando styled do Material UI
const StyledAppBar = styled(AppBar)({
    background: 'linear-gradient(to right, #6fb3d2, #a1c4fd)', // Fundo gradiente azul mais claro
    height: '80px', // Aumenta a altura da AppBar
});

const StyledButton = styled(Button)({
    fontWeight: 'bold', // Define a fonte em negrito
    fontSize: '16px', // Define o tamanho da fonte
});

export function NavBar() {
    const navigate = useNavigate(); // Hook para navegação
    const [anchorEl, setAnchorEl] = useState(null); // Estado para controlar o elemento âncora do menu
    const open = Boolean(anchorEl); // Define se o menu está aberto ou não
    
    // Função para abrir o menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    
    // Função para fechar o menu
    const handleClose = () => {
        setAnchorEl(null);
    }

    // Função para navegar para uma rota específica e fechar o menu
    const handleNavigation = (path) => {
        navigate(path);
        handleClose();
    }

    // Função para logout
    const logout = () => {
        localStorage.removeItem('jwtToken'); // Remove o token JWT do localStorage
        navigate('/login'); // Navega para a página de login
    };

    return (
        <StyledAppBar position='static'>
            <Toolbar>
                {/* Ícone e nome do aplicativo em telas maiores */}
                <IconButton 
                    size='large' 
                    edge='start' 
                    aria-label='logo' 
                    sx={{display:{xs:'none',md:'flex'}}}
                    onClick={() => navigate('/')}
                >
                    <CelebrationIcon sx={{color: 'white'}}/>
                </IconButton>
                <Typography variant='h6' component='div' sx={{flexGrow: 1, display:{xs:'none',md:'flex'}, fontWeight: 'bold', fontSize: '24px'}}> Helipa Eventos </Typography>
                
                {/* Botões de navegação em telas maiores */}
                <Box sx={{display:{xs:'none',md:'flex'}}}>
                    <StyledButton color='inherit' onClick={() => navigate('/')}>Home</StyledButton>
                    <StyledButton color='inherit' onClick={() => navigate('/eventos')}>Meus Eventos</StyledButton>
                    <StyledButton color='inherit' onClick={() => navigate('/cadastraeventos')}>Novo Evento</StyledButton>
                    <StyledButton color='inherit' onClick={logout}>Logout</StyledButton>
                </Box>
                
                {/* Ícone de menu para telas menores */}
                <Box sx={{display:{xs:'flex',md:'none'}}}>
                    <IconButton size='large' edge='start' color='inherit' aria-label='menu' onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id='menu-appbar'
                        MenuListProps={{'aria-labelledby': 'long-button'}}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuList>
                            <MenuItem onClick={() => handleNavigation('/')}>Home</MenuItem>
                            <MenuItem onClick={() => handleNavigation('/eventos')}>Meus Eventos</MenuItem>
                            <MenuItem onClick={() => handleNavigation('/cadastraeventos')}>Novo Evento</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
                
                {/* Ícone e nome do aplicativo em telas menores */}
                <IconButton 
                    size='large' 
                    edge='start' 
                    aria-label='logo' 
                    sx={{display:{xs:'flex',md:'none'}}}
                    onClick={() => navigate('/')}
                >
                    <CelebrationIcon sx={{color: 'white'}}/>
                </IconButton>
                <Typography variant='h6' component='div' sx={{flexGrow: 1, display:{xs:'flex',md:'none'}, fontWeight: 'bold', fontSize: '24px'}}> Helipa Eventos </Typography>
            </Toolbar>
        </StyledAppBar>
    );
}
