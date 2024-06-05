import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Grid } from '@mui/material';

export function Home() {
    const navigate = useNavigate();

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
            style={{ minHeight: '100vh' }}
        >
            <Grid item>
                <Typography variant="h2">Bem-vindo ao sistema de eventos</Typography>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/eventos`)}
                    style={{ width: '200px' }} // Definindo o mesmo tamanho para ambos os botões
                >
                    Meus Eventos
                </Button>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/cadastraeventos`)}
                    style={{ width: '200px' }} // Definindo o mesmo tamanho para ambos os botões
                >
                    Novo Evento
                </Button>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/linkcadastro`)}
                    style={{ width: '200px' }} // Definindo o mesmo tamanho para ambos os botões
                >
                    Gera Link Cadastro
                </Button>
            </Grid>
        </Grid>
    );
}
