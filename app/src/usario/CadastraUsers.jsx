import React, { Fragment, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, IconButton, Snackbar, TextField, Typography, Box } from '@mui/material';

export function CadastraUser() {
    const gridStyle = { margin: '10px' };

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
                // error processing
                throw 'Error';

            } return response.text();
        }).then(data => {
            setMessage(data)
            setOpen(true)
        }).catch(response => {
            setMessage(response.text())
            setOpen(true)
        }); 

    }

    return (
        <div style={{ padding: "5%" }}>
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
            <form style={{ display: "flex", alignItems: "center", flexDirection: 'column', backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "10px" }} onSubmit={click}>
                <TextField fullWidth label='Nome' style={{ margin: '10px', backgroundColor: 'white', borderRadius: '5px' }} value={nome} onChange={(event) => {
                    setNome(event.target.value);
                }} />

                <TextField fullWidth label='Email' style={{ margin: '10px', backgroundColor: 'white', borderRadius: '5px' }} value={email} onChange={(event) => {
                    setEmail(event.target.value);
                }} />

                <TextField fullWidth label='Senha' type='password' style={{ margin: '10px', backgroundColor: 'white', borderRadius: '5px' }} value={senha} onChange={(event) => {
                    setSenha(event.target.value);
                }} />

                <TextField fullWidth label='Confirme a senha' type='password' style={{ margin: '10px', backgroundColor: 'white', borderRadius: '5px' }} value={confSenha} onChange={(event) => {
                    setConfSenha(event.target.value);
                }} />

                <Box sx={{ margin: '10px' }}>
                    <Button variant='contained' color="primary" endIcon={<SaveIcon />} type="submit">Cadastrar</Button>
                </Box>
            </form>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={action}
            ></Snackbar>
        </div>
    );
}
