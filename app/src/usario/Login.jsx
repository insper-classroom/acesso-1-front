import React, { Fragment, useState } from 'react';
import { Grid, Paper, Typography, TextField, Button, IconButton, Snackbar, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const Container = styled('div')({
    minHeight: '100vh',
    background: 'linear-gradient(to right, #6fb3d2, #a1c4fd)',
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

export function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const saveToken = (token) => {
        localStorage.setItem('jwtToken', token);
    };

    const click = () => {
        let data = {
            email: email,
            senha: senha
        };

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
            navigate('/');
            saveToken(data);
        }).catch(() => {
            setOpen(true);
            setMessage('Erro no login!');
        });
    };

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
                <Typography variant="h4" align="center" style={{ margin: '20px', color: 'black', fontWeight: 'bold' }}>Login</Typography>
                <form style={{ display: "flex", alignItems: "center", flexDirection: 'column', width: '100%' }}>
                    <CustomTextField fullWidth label='Email' value={email} onChange={(event) => setEmail(event.target.value)} />
                    <CustomTextField fullWidth label='Senha' type='password' value={senha} onChange={(event) => setSenha(event.target.value)} />
                    <CustomButton variant='contained' color='primary' onClick={click} style={{ marginTop: '20px' }}>Login</CustomButton>
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
