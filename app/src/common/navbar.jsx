import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Grid, AppBar, Toolbar, IconButton, Box, Menu, MenuList, MenuItem } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import MenuIcon from '@mui/icons-material/Menu';

export function NavBar() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    
    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleNavigation = (path) => {
        navigate(path);
        handleClose();
    }

    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton 
                    size='large' 
                    edge='start' 
                    aria-label='logo' 
                    sx={{display:{xs:'none',md:'flex'}}}
                    onClick={() => navigate('/')}
                >
                    <CelebrationIcon sx={{color: 'white'}}/>
                </IconButton>
                <Typography variant='h6' component='div' sx={{flexGrow: 1, display:{xs:'none',md:'flex'}}}> Helipa Eventos </Typography>
                <Box sx={{display:{xs:'none',md:'flex'}}}>
                    <Button color='inherit' onClick={() => navigate('/')}>Home</Button>
                    <Button color='inherit' onClick={() => navigate('/eventos')}>Meus Eventos</Button>
                    <Button color='inherit' onClick={() => navigate('/cadastraeventos')}>Novo Evento</Button>
                </Box>
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
                <IconButton 
                    size='large' 
                    edge='start' 
                    aria-label='logo' 
                    sx={{display:{xs:'flex',md:'none'}}}
                    onClick={() => navigate('/')}
                >
                    <CelebrationIcon sx={{color: 'white'}}/>
                </IconButton>
                <Typography variant='h6' component='div' sx={{flexGrow: 1, display:{xs:'flex',md:'none'}}}> Nome app </Typography>
            </Toolbar>
        </AppBar>
    );
}
