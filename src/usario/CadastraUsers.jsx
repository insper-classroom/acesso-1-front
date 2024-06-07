import React, { Fragment, useState } from 'react';
// Importações de componentes do Material UI
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, IconButton, Snackbar, TextField, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

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

const FormContainer = styled(Box)(({ theme }) => ({
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

export function CadastraUser() {
    // Estados para armazenar os valores dos campos do formulário
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confSenha, setConfSenha] = useState('');

    // Estado para controlar a abertura do Snackbar
    const [open, setOpen] = useState(false);
    // Estado para a mensagem do Snackbar
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); // Hook para navegação
    const { token } = useParams(); // Hook para obter os parâmetros da URL

    // Função para fechar o Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    // Ação do Snackbar para desfazer
    const action = (
        <Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
            </IconButton>
        </Fragment>
    );

    // Função para lidar com o clique do botão de enviar
    function click(event) {
        event.preventDefault();
        
        // Dados do formulário
        let data = {
            "nome": nome,
            "email": email,
            "senha": senha,
            "senhaConfirmacao": confSenha
        };

        // Envio dos dados para o backend
        fetch(`https://api.helipaeventos.com.br/user/${token}`, {
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
            setMessage(data);
            setOpen(true);
            navigate('/login'); // Redireciona para a página de login após o cadastro
        }).catch(response => {
            setMessage(response.message);
            setOpen(true);
        }); 
    }

    return (
        <Container>
            <FormContainer>
                {/* Botão para voltar à página inicial */}
                <IconButton onClick={() => navigate('/')} sx={{ alignSelf: 'flex-start', '&:hover': { color: 'primary.main' } }}>
                    <ArrowBackIcon />
                </IconButton>
                {/* Título do formulário */}
                <Typography variant="h4" align="center" style={{ margin: '20px', color: 'black', fontWeight: 'bold' }}>Novo usuário</Typography>
                <Typography color={'black'} align="center">Preencha esse formulário para se cadastrar na plataforma</Typography>
                {/* Formulário de cadastro de usuário */}
                <form style={{ display: "flex", alignItems: "center", flexDirection: 'column', width: '100%' }} onSubmit={click}>
                    <CustomTextField fullWidth label='Nome' value={nome} onChange={(event) => {
                        setNome(event.target.value);
                    }} />
                    <CustomTextField fullWidth label='Email' value={email} onChange={(event) => {
                        setEmail(event.target.value);
                    }} />
                    <CustomTextField fullWidth label='Senha' type='password' value={senha} onChange={(event) => {
                        setSenha(event.target.value);
                    }} />
                    <CustomTextField fullWidth label='Confirme a senha' type='password' value={confSenha} onChange={(event) => {
                        setConfSenha(event.target.value);
                    }} />
                    <CustomButton variant='contained' color="primary" endIcon={<SaveIcon />} type="submit" sx={{ marginTop: '20px' }}>Cadastrar</CustomButton>
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
