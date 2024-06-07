import React, { Fragment, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, IconButton, Snackbar, TextField, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const Container = styled('div')({
    minHeight: '100vh',
    background: 'linear-gradient(to right, #6fb3d2, #a1c4fd)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const CustomButton = styled(Button)(({ theme }) => ({
    borderRadius: '12px',
    '&.MuiButton-containedPrimary': {
        backgroundColor: '#4f8cff',
        '&:hover': {
            backgroundColor: '#3b7adf',
        },
    },
    '&.MuiButton-containedError': {
        backgroundColor: '#ff4949',
        '&:hover': {
            backgroundColor: '#e63939',
        },
    },
    [theme.breakpoints.up('lg')]: {
        width: '250px',
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
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confSenha, setConfSenha] = useState('');

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const { token } = useParams();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

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

    function click(event) {
        event.preventDefault();
        
        let data = {
            "nome": nome,
            "email": email,
            "senha": senha,
            "senhaConfirmacao": confSenha
        };

        fetch(`http://localhost:8080/user/${token}`, {
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
            setMessage(data)
            setOpen(true)
            navigate('/login')
        }).catch(response => {
            setMessage(response.message)
            setOpen(true)
        }); 

    }

    return (
        <Container>
            <FormContainer>
                <IconButton onClick={() => navigate('/')} sx={{ alignSelf: 'flex-start', '&:hover': { color: 'primary.main' } }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" align="center" style={{ margin: '20px', color: 'black', fontWeight: 'bold' }}>Novo usuário</Typography>
                <Typography color={'black'} align="center">Preencha esse formulário para se cadastrar na plataforma</Typography>
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
