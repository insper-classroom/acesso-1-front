import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Button, Grid, Tooltip, Box, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTheme, styled } from '@mui/material/styles';
import { NavBar } from './common/navbar';

const MainContainer = styled(Grid)(({ theme }) => ({
  minHeight: '100vh', // Define a altura mínima como 100% da altura da viewport
  display: 'grid',
  gridTemplateRows: 'auto 1fr', // Duas linhas, a primeira para a NavBar e a segunda para o conteúdo
}));

const Container = styled(Grid)(({ theme }) => ({
  background: 'linear-gradient(to right, #6fb3d2, #a1c4fd)', // Lighter blue gradient background
  padding: '0% 5% 5% 5%',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column', // Align items in column direction
  overflow: 'auto', // Add scroll bar when content overflows
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  width: '250px', // Increased width
  height: '60px', // Increased height
  margin: theme.spacing(1, 0),
  borderRadius: '20px',
  backgroundColor: '#70a1ff', // Lighter blue color for buttons
  color: '#fff',
  fontSize: '18px', // Increased font size
  fontWeight: 'bold',
  textTransform: 'capitalize', // Capitalize the first letter
  boxShadow: 'none', // Remove box shadow
  '&:hover': {
    backgroundColor: '#1e90ff', // Darker blue on hover
  },
}));

const LinkContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: '#fff', // White background for the link container
  color: theme.palette.text.primary,
  width: '250px', // Match the button width
  maxWidth: '600px', // Max width to prevent it from getting too large
  fontWeight: 'bold',
  borderRadius: '12px', // More rounded corners
  boxShadow: 'none', // Remove box shadow
}));

const StyledTooltip = styled(Tooltip)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // White transparent background
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: 'none', // Remove box shadow
}));

export function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [signupLink, setSignupLink] = useState('');
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('Token não encontrado. Faça login novamente.');
      navigate('/login');
    }
  }, []);

  const handleTooltipClose = () => {
    setShowCopiedTooltip(false);
  };

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
    navigator.clipboard.writeText(link);
    setShowCopiedTooltip(true);
    setTimeout(() => setShowCopiedTooltip(false), 2000); // Hide tooltip after 2 seconds
  };

  return (
    <MainContainer container>
      <NavBar />
      <Container container>
        <ButtonContainer>
          <Title variant="h2" style={{ color: 'black' }}>Home</Title>
          <ActionButton variant="contained" onClick={() => navigate(`/eventos`)}>
            Meus Eventos
          </ActionButton>
          <ActionButton variant="contained" onClick={() => navigate(`/cadastraeventos`)}>
            Novo Evento
          </ActionButton>
          <ActionButton variant="contained" onClick={generateSignUpLink}>
            Convidar Organizador
          </ActionButton>
          {signupLink && (
            <>
              <LinkContainer>
                <Typography variant="body1" component="span" sx={{ wordBreak: 'break-all', marginBottom: 2, fontWeight: 'bold' }}>
                  <Link to={signupLink}>{signupLink}</Link>
                </Typography>
                <Button variant="outlined" onClick={() => copyToClipboard(signupLink)} style={{ fontWeight: 'bold' }}>
                  <ContentCopyIcon />
                </Button>
                <StyledTooltip open={showCopiedTooltip} title="Copied!" placement="top">
                  <span></span>
                </StyledTooltip>
              </LinkContainer>
              <Typography variant="caption" color={'black'} fontSize={"16px"} sx={{ marginTop: 2, fontWeight: 'bold' }}>
                Envie esse link para outro organizador se cadastrar
              </Typography>
            </>
          )}
        </ButtonContainer>
      </Container>
    </MainContainer>
  );
}
