import React, { Fragment, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import 'dayjs/locale/pt-br';
import { Button, Grid, IconButton, Snackbar, TextField, Typography } from '@mui/material';

export function CadastraUser() {
    const paperStyle = { padding: '30px 20px', width: "100%" };
    const gridStyle = { margin: '10px' };
    const formStyle = { margin: '10px' };

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confSenha, setConfSenha] = useState('');

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const { token } = useParams();

    const handleClose = (user, reason) => {
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

    function click() {

        let data = {
            "nome": nome,
            "email": email,
            "senha": senha,
            "senhaConfirmacao": confSenha
        }

        fetch(`http://localhost:8080/user/${token}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
                // error processing
                throw 'Error';
            }
            setOpen(true)
            setMessage("Usuário cadastrado com sucesso!")
            //load()
        }).catch(response => {
            setOpen(true)
            setMessage('Erro no cadastro do usuário!')
        }).finally(() => {
            navigate('/');
        });
    }

    return (
        <>
            <IconButton onClick={() => navigate('/')} sx={{
                '&:hover': {
                    color: 'primary.main'
                }
            }}>
                <ArrowBackIcon />
            </IconButton>
            <Grid style={gridStyle}>
                <h2 style={{ color: 'black', textAlign: 'center', margin: '20px' }}>Novo usuário</h2>
                <Typography color={'black'}>Preencha esse formulário para se cadastrar na plataforma</Typography>
            </Grid>
            <form action="" style={{
                display: "flex",
                alignItems: "center",
                flexDirection: 'column',
            }}>
                <TextField fullWidth label='Nome' style={formStyle} value={nome} onChange={(user) => {
                    setNome(user.target.value);
                }} />

                <TextField fullWidth label='Email' style={formStyle} value={email} onChange={(user) => {
                    setEmail(user.target.value);
                }} />

                <TextField fullWidth label='Senha' type='password' style={formStyle} value={senha} onChange={(user) => {
                    setSenha(user.target.value);
                }} />

                <TextField fullWidth label='Confirme a senha' type='password' style={formStyle} value={confSenha} onChange={(user) => {
                    setConfSenha(user.target.value);
                }} />

                <Button variant='contained' endIcon={<SaveIcon />} onClick={click}>Cadastrar</Button>
            </form>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={action}
            ></Snackbar>
        </>
    )
}
