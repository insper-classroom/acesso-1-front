import React, { Fragment, useState } from 'react';
// Importações de componentes do Material UI
import { Grid, Paper, Typography, TextField, Button, IconButton, Snackbar, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

// Estilização de componentes usando styled do Material UI
const Container = styled('div')({
    minHeight: '100vh', // Define a altura mínima como 100% da altura da viewport
    background: 'linear-gradient(to right, #6fb3d2, #a1c4fd)', // Fundo gradiente azul mais claro
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
});

const FormContainer = styled(Paper)(({ theme }) => ({
    padding: '30px 20px',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fundo mais claro
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const CustomButton = styled(Button)(({ theme }) => ({
    borderRadius: '12px', // Cantos arredondados
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

const CustomTextField = styled(TextField)({
    margin: '10px',
    backgroundColor: 'white',
    borderRadius: '5px',
    width: '100%'
});

export function Login() {
    // Estados para armazenar os valores dos campos de email e senha
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    // Estado para controlar a abertura do Snackbar
    const [open, setOpen] = useState(false);
    // Estado para a mensagem do Snackbar
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook para navegação

    // Função para fechar o Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    // Função para salvar o token JWT no localStorage
    const saveToken = (token) => {
        localStorage.setItem('jwtToken', token);
    };

    // Função para lidar com o clique do botão de login
    const click = () => {
        let data = {
            email: email,
            senha: senha
        };

        // Envio dos dados de login para o backend
        fetch('http://localhost:8080/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.text();
        }).then(data => {
            setOpen(true);
            setMessage("Login feito com sucesso!");
            navigate('/'); // Redireciona para a página inicial após o login
            saveToken(data); // Salva o token JWT no localStorage
        }).catch(() => {
            setOpen(true);
            setMessage('Erro no login!');
        });
    };

    // Ação do Snackbar para desfazer
    const action = (
        <Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            </IconButton>
        </Fragment>
    );

    return (
        <Container>
            <FormContainer elevation={0}>
                {/* Título do formulário de login */}
                <Typography variant="h4" align="center" style={{ margin: '20px', color: 'black', fontWeight: 'bold' }}>Login</Typography>
                {/* Formulário de login */}
                <form style={{ display: "flex", alignItems: "center", flexDirection: 'column', width: '100%' }}>
                    <CustomTextField fullWidth label='Email' value={email} onChange={(event) => setEmail(event.target.value)} />
                    <CustomTextField fullWidth label='Senha' type='password' value={senha} onChange={(event) => setSenha(event.target.value)} />
                    <CustomButton variant='contained' color='primary' onClick={click} style={{ marginTop: '20px' }}>Login</CustomButton>
                </form>
                {/* Snackbar para exibir mensagens de sucesso ou erro */}
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={message}
                    action={action}
                />
            </FormContainer>
        </Container>
    );
}
