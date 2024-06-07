import React, { Fragment, useState, useEffect } from 'react';
// Importações de componentes do Material UI
import { FormGroup, FormControl, InputLabel, Input, Grid, Paper, Typography, TextField, InputAdornment, Button, Select, MenuItem, IconButton, Snackbar, Box, Tooltip } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import 'dayjs/locale/pt-br';
import { styled } from '@mui/material/styles';
import { NavBar } from '../common/navbar';

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

const CustomPaper = styled(Paper)({
    margin: '10px',
    backgroundColor: 'white',
    borderRadius: '5px',
    width: '100%',
});

const MainContainer = styled(Grid)(({ theme }) => ({
    minHeight: '100vh',
    display: 'grid',
    gridTemplateRows: 'auto 1fr', // Duas linhas, a primeira para a NavBar e a segunda para o conteúdo
}));

export function CadastraEvento() {
    // Gerenciamento de estado para os campos do formulário
    const handleChangeTipo = (event) => {
        setTipo(event.target.value);
    };

    const handleChangeRegiao = (event) => {
        setRegiao(event.target.value);
    };

    const [nome, setNome] = useState('');
    const [organizador, setOrganizador] = useState('');
    const [dataEvento, setDataEvento] = useState(null);
    const [horario, setHorario] = useState(null);
    const [tipo, setTipo] = useState('');
    const [endereco, setEndereco] = useState('');
    const [regiao, setRegiao] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [telefone, setTelefone] = useState('');
    const [foto, setFoto] = useState('');
    const [linkEvento, setLinkEvento] = useState('');

    const [id, setId] = useState('');
    const [data, setData] = useState([]);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    // Função para fechar o Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const token = localStorage.getItem('jwtToken');

    // Ação do Snackbar, inclui um botão UNDO
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

    // Formatação da data para string no formato brasileiro
    const formatDateToString = (date) => {
        if (!date) return '';
        return date.format('DD/MM/YYYY');
    };

    // Formatação do horário para string no formato brasileiro
    const formatTimeToString = (time) => {
        if (!time) return '';
        return time.format('HH:mm');
    };

    // Input visualmente escondido para acessibilidade
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    // Carregar dados quando o componente é montado
    useEffect(() => {
        load(token);
    }, []);

    // Função para carregar dados do servidor
    function load(token) {
        fetch(`https://api.helipaeventos.com.br/id/${token}`, {
            method: 'GET',
        }).then(response => {
            return response.text();
        }).then(data => {
            setData(data);
            setId(data)
            console.log(data);
        }).catch(response => {
            alert('Erro ao listar eventos!');
            alert(response.status);
            console.log(data);
        });
    }

    // Função para lidar com o clique no botão de cadastro
    function click(event) {
        event.preventDefault();
        let data = {
            "nome": nome,
            "organizador": "organizador",
            "data": formatDateToString(dataEvento),
            "tipo": tipo,
            "endereco": endereco,
            "regiao": regiao,
            "preco": parseFloat(preco),
            "descricao": descricao,
            "telefone": telefone,
            "link": linkEvento,
            "horario": formatTimeToString(horario),
        }

        console.log(token);

        fetch(`https://api.helipaeventos.com.br/evento/${id}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).then(response => {
            if (!response.ok) {
                // Tratamento de erro
                throw 'Error';
            }
            console.log(response);
            setOpen(true);
            setMessage("Evento cadastrado com sucesso!");
        }).catch(response => {
            setOpen(true);
            setMessage('Erro no cadastro do evento!');
        }).finally(() => {
            navigate('/eventos');
        });
    }

    // Tooltip de descrição com informações detalhadas
    const descriptionTooltip = (
        <ul>
            <li>Descreva o evento de forma clara e concisa</li>
            <li>Inclua informações relevantes como atrações e atividades</li>
            <li>Mencione se há necessidade de inscrição prévia ou restrições de idade</li>
        </ul>
    );

    // Tooltip para o campo de telefone
    const phoneTooltip = "O formato deve ser (DD)XXXXXXXXX";

    return (
        <MainContainer container>
            {/* Componente de navegação */}
            <NavBar /> {/* Adicionando NavBar no topo */}
            <Grid item xs={12}>
                <Container>
                    <FormContainer elevation={0}>
                        {/* Botão para voltar à página anterior */}
                        <IconButton onClick={() => navigate('/')} sx={{ alignSelf: 'flex-start', '&:hover': { color: 'primary.main' } }}>
                            <ArrowBackIcon />
                        </IconButton>
                        {/* Título do formulário */}
                        <Typography variant="h4" align="center" style={{ margin: '20px', color: 'black', fontWeight: 'bold' }}>Novo evento</Typography>
                        <Typography color="black" align="center">Preencha esse formulário para cadastrar um novo evento</Typography>
                        
                        {/* Formulário de cadastro de evento */}
                        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} onSubmit={click}>
                            <CustomTextField
                                label='Nome do evento'
                                value={nome}
                                onChange={(event) => setNome(event.target.value)}
                            />
                            
                            {/* Campos de data e horário com suporte a internacionalização */}
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                                <CustomPaper elevation={0}>
                                    <DatePicker
                                        label="Data"
                                        value={dataEvento}
                                        onChange={(newValue) => setDataEvento(newValue)}
                                        renderInput={(params) => <TextField {...params} fullWidth style={{ backgroundColor: 'white', borderRadius: '5px' }} />}
                                        slotProps={{ textField: { fullWidth: true } }}
                                    />
                                </CustomPaper>
                                <CustomPaper elevation={0}>
                                    <TimePicker
                                        label="Horário"
                                        value={horario}
                                        onChange={(newValue) => setHorario(newValue)}
                                        renderInput={(params) => <TextField {...params} fullWidth style={{ backgroundColor: 'white', borderRadius: '5px'}} />}
                                        slotProps={{ textField: { fullWidth: true } }}
                                    />
                                </CustomPaper>
                            </LocalizationProvider>
    
                            {/* Campo de endereço */}
                            <CustomTextField
                                label='Endereço'
                                value={endereco}
                                onChange={(event) => setEndereco(event.target.value)}
                            />
    
                            {/* Campos de seleção de região e tipo de evento */}
                            <FormControl fullWidth style={{ margin: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
                                <InputLabel>Região</InputLabel>
                                <Select
                                    value={regiao}
                                    onChange={handleChangeRegiao}
                                    label="Região"
                                >
                                    <MenuItem value={'Heliópolis'}>Heliópolis</MenuItem>
                                    <MenuItem value={'Ipiranga'}>Ipiranga</MenuItem>
                                    <MenuItem value={'Sacomã'}>Sacomã</MenuItem>
                                    <MenuItem value={'Cursino'}>Cursino</MenuItem>
                                    <MenuItem value={'Outro'}>Outro</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth style={{ margin: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
                                <InputLabel>Tipo</InputLabel>
                                <Select
                                    value={tipo}
                                    onChange={handleChangeTipo}
                                    label="Tipo"
                                >
                                    <MenuItem value={'Festa'}>Festa</MenuItem>
                                    <MenuItem value={'Cultural'}>Cultural</MenuItem>
                                    <MenuItem value={'Esportivo'}>Esportivo</MenuItem>
                                    <MenuItem value={'Religioso'}>Religioso</MenuItem>
                                    <MenuItem value={'Educacional'}>Educacional</MenuItem>
                                    <MenuItem value={'Acadêmico'}>Acadêmico</MenuItem>
                                    <MenuItem value={'Outro'}>Outro</MenuItem>
                                </Select>
                            </FormControl>
    
                            {/* Campo de preço */}
                            <CustomTextField
                                label='Preço'
                                type='number'
                                InputProps={{ endAdornment: <InputAdornment position="start">R$</InputAdornment> }}
                                value={preco}
                                onChange={(event) => setPreco(event.target.value)}
                            />
    
                            {/* Campo de descrição com tooltip explicativo */}
                            <Tooltip title={descriptionTooltip} placement="top" arrow>
                                <CustomTextField
                                    label='Descrição'
                                    multiline
                                    rows={5}
                                    value={descricao}
                                    onChange={(event) => setDescricao(event.target.value)}
                                />
                            </Tooltip>
    
                            {/* Campo de telefone com tooltip de formatação */}
                            <Tooltip title={phoneTooltip} placement="top" arrow>
                                <CustomTextField
                                    label='Telefone (Opcional)'
                                    value={telefone}
                                    onChange={(event) => setTelefone(event.target.value)}
                                />
                            </Tooltip>
    
                            {/* Campo de link do evento */}
                            <CustomTextField
                                label='Link do evento (Opcional)'
                                value={linkEvento}
                                onChange={(event) => setLinkEvento(event.target.value)}
                            />
    
                            {/* Botão de submissão do formulário */}
                            <Box>
                                <Button variant='contained' color="primary" endIcon={<SaveIcon />} type="submit" sx={{ 
                                        margin: '10px', 
                                        borderRadius: '16px', 
                                        width: { xs: '200px', lg: '250px' }, 
                                        height: { xs: '50px', lg: '60px' }, 
                                        backgroundColor: '#4f8cff', 
                                        fontWeight: 'bold',
                                        '&:hover': { backgroundColor: '#3b7adf' } 
                                    }}>Cadastrar</Button>
                            </Box>
                        </form>
                    </FormContainer>
    
                    {/* Snackbar para exibir mensagens de sucesso ou erro */}
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={message}
                        action={action}
                    ></Snackbar>
                </Container>
            </Grid>
        </MainContainer>
    );
    
}
