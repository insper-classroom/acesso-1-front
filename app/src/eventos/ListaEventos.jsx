import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Button, IconButton, Snackbar, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../common/navbar';
import { styled } from '@mui/material/styles';

const Container = styled('div')({
    minHeight: '100%', // Ensure the container takes the full viewport height
    background: 'linear-gradient(to right, #6fb3d2, #a1c4fd)', // Lighter blue gradient background
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0% 5% 5% 5%',
});

const ContentContainer = styled(Box)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.6)', // Fundo branco ligeiramente transparente
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    width: '100%', // Ocupar toda a largura disponível
    [theme.breakpoints.up('lg')]: {
        width: '50%', // 50% de largura em dispositivos grandes
    },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: '16px',
    textAlign: 'center',
    borderRadius: '16px',
    boxShadow: 'none', // Remover sombra
}));

const CustomButton = styled(Button)(({ theme }) => ({
    borderRadius: '12px', // Arredonda os botões
    '&.MuiButton-containedPrimary': {
        backgroundColor: '#4f8cff', // Cor personalizada para botões azuis
        '&:hover': {
            backgroundColor: '#3b7adf', // Tom mais escuro ao passar o mouse
        },
    },
    '&.MuiButton-containedError': {
        backgroundColor: '#ff4949', // Cor personalizada para botão de excluir
        '&:hover': {
            backgroundColor: '#e63939', // Tom mais escuro ao passar o mouse
        },
    },
    [theme.breakpoints.up('lg')]: {
        width: '250px', // Largura maior em dispositivos grandes
        height: '60px', // Altura maior em dispositivos grandes
    },
}));

export function ListaEventos() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        load();
    }, []);

    function load() {
        fetch('http://localhost:8080/evento', {
            method: 'GET'
        }).then(response => response.json())
            .then(data => {
                // Ordena os eventos pela data
                const sortedData = data.sort((a, b) => new Date(a.data) - new Date(b.data));
                setData(sortedData);
            })
            .catch(response => {
                alert('Erro ao listar eventos!');
                alert(response.status);
            });
    }

    function deleteEvento(id) {
        fetch(`http://localhost:8080/evento/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if (!response.ok) throw new Error('Erro ao deletar evento!');
            setOpen(true);
            setMessage("Evento deletado com sucesso");
            load();
        }).catch(error => {
            setOpen(true);
            setMessage('Erro ao deletar evento!');
        });
    }

    return (
        <>
            <NavBar />
            <Container>
                <ContentContainer>
                    <Grid container alignItems="center" justifyContent="flex-start">
                        <Grid item>
                            <IconButton onClick={() => navigate('/')} sx={{ '&:hover': { color: 'primary.main' } }}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Typography align='center' variant="h4" style={{ margin: '10px', color: 'black' }}>Meus eventos</Typography>

                    <Grid container direction="column" alignItems="center" spacing={3}>
                        {data.map((evento) => (
                            <Grid item key={evento.id} style={{ width: '100%' }}>
                                <StyledPaper elevation={0}>
                                    <Typography variant="h5">{evento.nome}</Typography> {/* Aumenta o tamanho do nome */}
                                    <Typography variant="body2">{new Date(evento.data).toLocaleDateString()}</Typography>
                                    <Box mt={2} display="flex" justifyContent="space-around">
                                        <CustomButton variant="contained" color="primary" onClick={() => navigate(`/editaeventos/${evento.id}`)}>Editar</CustomButton> {/* Usa o botão personalizado */}
                                        <CustomButton variant="contained" color="error" onClick={() => deleteEvento(evento.id)}>Excluir</CustomButton> {/* Usa o botão personalizado */}
                                    </Box>
                                </StyledPaper>
                            </Grid>
                        ))}
                    </Grid>

                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button
                            variant='contained'
                            sx={{ 
                                margin: '10px', 
                                borderRadius: '16px', 
                                width: { xs: '200px', lg: '250px' }, // Largura maior em dispositivos grandes
                                height: { xs: '50px', lg: '60px' }, // Altura maior em dispositivos grandes
                                backgroundColor: '#4f8cff', 
                                '&:hover': { backgroundColor: '#3b7adf' } 
                            }} 
                            endIcon={<AddIcon />}
                            onClick={() => navigate('/cadastraeventos')}
                        >
                            Novo evento
                        </Button>
                    </Box>
                </ContentContainer>

                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={() => setOpen(false)}
                    message={message}
                />
            </Container>
        </>
    );
}
