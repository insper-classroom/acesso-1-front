import React, { useEffect, useState } from 'react';
// Importações de componentes do Material UI
import { Grid, Paper, Typography, Button, IconButton, Snackbar, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../common/navbar';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat); // Extensão para parse de formatos customizados

// Estilização de componentes usando styled do Material UI
const Container = styled('div')({
    minHeight: '100%', // Define a altura mínima como 100% da altura da viewport
    background: 'linear-gradient(to right, #6fb3d2, #a1c4fd)', // Fundo gradiente azul
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0% 5% 5% 5%',
});

const ContentContainer = styled(Box)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.7)', // Fundo mais claro
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('lg')]: {
        width: '50%',
    },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: '16px',
    textAlign: 'center',
    borderRadius: '16px',
    boxShadow: 'none',
}));

const CustomButton = styled(Button)(({ theme }) => ({
    fontWeight: 'bold',
    borderRadius: '12px',
    '&.MuiButton-containedPrimary': {
        backgroundColor: '#4f8cff', // Cor azul personalizada
        '&:hover': {
            backgroundColor: '#3b7adf', // Sombra mais escura ao passar o mouse
        },
    },
    '&.MuiButton-containedError': {
        backgroundColor: '#ff4949', // Cor vermelha personalizada
        '&:hover': {
            backgroundColor: '#e63939', // Sombra mais escura ao passar o mouse
        },
    },
    [theme.breakpoints.up('lg')]: {
        width: '250px', // Tamanho maior em telas maiores
        height: '60px',
    },
}));

export function ListaEventos() {
    const navigate = useNavigate(); // Hook para navegação
    const [data, setData] = useState([]); // Estado para armazenar os dados dos eventos
    const [open, setOpen] = useState(false); // Estado para controlar a abertura do Snackbar
    const [message, setMessage] = useState(""); // Estado para a mensagem do Snackbar
    const token = localStorage.getItem('jwtToken'); // Recupera o token do localStorage

    useEffect(() => {
        load(); // Carrega os dados quando o componente é montado
    }, []);

    async function load() {
        // Obtém o ID do usuário
        let id = await fetch(`https://api.helipaeventos.com.br/id/${token}`, {
            method: 'GET',
        }).then(response => response.text())
        .catch(response => {
            alert('Erro ao listar eventos!');
            alert(response.status);
        });

        // Busca os eventos do usuário
        fetch(`https://api.helipaeventos.com.br/eventos/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': token,
            }
        }).then(response => response.json())
        .then(data => {
            // Ordena os eventos pela data
            const sortedData = data.sort((a, b) => {
                const dateA = dayjs(a.data, 'DD/MM/YYYY');
                const dateB = dayjs(b.data, 'DD/MM/YYYY');
                return dateA - dateB;
            });
            setData(sortedData);
        }).catch(response => {
            alert('Erro ao listar eventos!');
            alert(response.status);
        });
    }

    // Função para deletar um evento
    function deleteEvento(id) {
        fetch(`https://api.helipaeventos.com.br/evento/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).then(response => {
            if (!response.ok) throw new Error('Erro ao deletar evento!');
            setOpen(true);
            setMessage("Evento deletado com sucesso");
            load(); // Recarrega os dados após a exclusão
        }).catch(error => {
            setOpen(true);
            setMessage('Erro ao deletar evento!');
        });
    }

    return (
        <>
            {/* Componente de navegação */}
            <NavBar />
            <Container>
                <ContentContainer>
                    <Grid container alignItems="center" justifyContent="flex-start">
                        <Grid item>
                            {/* Botão para voltar à página inicial */}
                            <IconButton onClick={() => navigate('/')} sx={{ '&:hover': { color: 'primary.main' } }}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Typography align='center' variant="h4" style={{ margin: '10px 0px 20px 0px', color: 'black', fontWeight: 'bold'}}>Meus eventos</Typography>

                    <Grid container direction="column" alignItems="center" spacing={3}>
                        {/* Mapeia os eventos e cria um card para cada um */}
                        {data.map((evento) => (
                            <Grid item key={evento.id} style={{ width: '100%' }}>
                                <StyledPaper elevation={0}>
                                    <Typography variant="h5" style={{fontWeight: 'bold'}}>{evento.nome}</Typography>
                                    <Typography variant="body2">{evento.data}</Typography>
                                    <Box mt={2} display="flex" justifyContent="space-around">
                                        <CustomButton variant="contained" color="primary" onClick={() => navigate(`/editaeventos/${evento.id}`)}>Editar</CustomButton>
                                        <CustomButton variant="contained" color="error" onClick={() => deleteEvento(evento.id)}>Excluir</CustomButton>
                                    </Box>
                                </StyledPaper>
                            </Grid>
                        ))}
                    </Grid>

                    <Box display="flex" justifyContent="center" mt={2}>
                        {/* Botão para adicionar novo evento */}
                        <Button
                            variant='contained'
                            sx={{ 
                                margin: '10px', 
                                borderRadius: '16px', 
                                width: { xs: '200px', lg: '250px' }, 
                                height: { xs: '50px', lg: '60px' },
                                backgroundColor: '#4f8cff', 
                                fontWeight: 'bold',
                                '&:hover': { backgroundColor: '#3b7adf' } 
                            }} 
                            endIcon={<AddIcon />}
                            onClick={() => navigate('/cadastraeventos')}
                        >
                            Novo evento
                        </Button>
                    </Box>
                </ContentContainer>

                {/* Snackbar para exibir mensagens de sucesso ou erro */}
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
