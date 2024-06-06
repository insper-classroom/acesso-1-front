import React, { Fragment, useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Grid, Paper, Typography, TextField, InputAdornment, Button, Select, MenuItem, IconButton, Snackbar, Box, Tooltip } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import 'dayjs/locale/pt-br';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export function Login() {
    const gridStyle = { margin: '10px' };
    const formStyle = { margin: '10px' };

    const handleChangeTipo = (event) => {
        setTipo(event.target.value);
    };

    const handleChangeRegiao = (event) => {
        setRegiao(event.target.value);
    };

    const [email, setEmail] = React.useState();
    const [senha, setSenha] = React.useState();

    const [open, setOpen] = useState(false);

    const [message, setMessage] = useState();

    const navigate = useNavigate();

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


    function click() {
        let data = {
            "email": email,
            "senha": senha
        }

        fetch('http://localhost:8080/login', {
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
            setOpen(true);
            setMessage("Login feito com sucesso!");
            navigate('/');
            //load()
        }).catch(response => {
            setOpen(true);
            setMessage('Erro no login!');
        });
    }

    return (
        <>
            <Grid style={gridStyle}>
                <h2 style={{ color: 'black', textAlign: 'center', margin: '20px' }}>Login</h2>
            </Grid>
            <form action="" style={{
                display: "flex",
                alignItems: "center",
                flexDirection: 'column',
            }}>
                <TextField fullWidth label='Email' style={formStyle} value={email} onChange={(event) => {
                    setEmail(event.target.value);
                }} />
                <TextField fullWidth label='Senha' style={formStyle} value={senha} onChange={(event) => {
                    setSenha(event.target.value);
                }} />
                

                <Box sx={{ margin: '10px' }}>
                    <Button variant='contained' onClick={() => click(0)}>Login</Button>
                </Box>
            </form>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={action}
            ></Snackbar>
        </>
    );
}
