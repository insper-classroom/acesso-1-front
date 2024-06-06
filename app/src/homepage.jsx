import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Grid, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export function Home() {
    const navigate = useNavigate();
    const [signupLink, setSignupLink] = useState('');
    const [showCopiedTooltip, setShowCopiedTooltip] = useState(false); // Estado para controlar a exibição do tooltip de cópia

    const generateSignUpLink = async () => {
        try {
            const response = await fetch('http://localhost:8080/signup');
            if (!response.ok) {
                throw new Error('Failed to fetch signup link');
            }
            const link = await response.text();
            
            const token = link.split('/').pop();
            const frontendLink = `http://localhost:5173/cadastrausuarios/${token}`;
            setSignupLink(frontendLink);
        } catch (error) {
            console.error(error);
        }
    };

    const copyToClipboard = (link) => {
        setShowCopiedTooltip(true); // Mostra o tooltip de confirmação de cópia
        navigator.clipboard.writeText(link);
    };

const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('Token não encontrado. Faça login novamente.');
      return navigate('/login');
    }

    const handleTooltipClose = () => {
        setShowCopiedTooltip(false);
    };

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
                    style={{ width: '200px' }} 
                >
                    Meus Eventos
                </Button>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/cadastraeventos`)}
                    style={{ width: '200px' }} 
                >
                    Novo Evento
                </Button>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={generateSignUpLink} // Chama a função para gerar o link de cadastro
                    style={{ width: '200px' }} 
                >
                    Convidar Organizador
                </Button>
            </Grid>
                {/* Mostra o link gerado e o botão de cópia */}
            {signupLink && (
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <span style={{ color: 'blue', marginRight: '10px' }}>{signupLink}</span>
                        <Button variant="outlined" onClick={() => copyToClipboard(signupLink)}>
                            <ContentCopyIcon />
                        </Button>
                        <Tooltip
                            open={showCopiedTooltip}
                            title="Copied!"
                            placement="top"
                            onClose={handleTooltipClose}
                        >
                            </Tooltip>
                </div>
                )}
        </Grid>
    );
}
