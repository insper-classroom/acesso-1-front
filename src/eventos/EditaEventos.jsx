import React, { Fragment, useEffect, useState } from 'react';
// Importações de componentes do Material UI
import { FormGroup, FormControl, InputLabel, Input, Grid, Paper, Typography, TextField, InputAdornment, Button, Select, MenuItem, IconButton, Snackbar, Box, Tooltip } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import 'dayjs/locale/pt-br';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
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
    minHeight: '100vh', // Define a altura mínima como 100% da altura da viewport
    display: 'grid',
    gridTemplateRows: 'auto 1fr', // Duas linhas, a primeira para a NavBar e a segunda para o conteúdo
}));

export function EditaEventos() {
    // Gerenciamento de estado para os campos do formulário
    const handleChangeTipo = (event) => {
        setTipo(event.target.value);
    };

    const handleChangeRegiao = (event) => {
        setRegiao(event.target.value);
    };

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState();

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

    // Converte string de data para objeto Dayjs
    const formatStringToDate = (dateString) => {
        if (!dateString) return null;
        return dayjs(dateString, 'DD/MM/YYYY');
    };

    // Formatação do horário para string no formato brasileiro
    const formatTimeToString = (time) => {
        if (!time) return '';
        return time.format('HH:mm');
    };

    // Hook para acessar os parâmetros da URL
    const { id } = useParams();
    const [data, setData] = useState([]);

    const [nome, setNome] = useState('');
    const [organizador, setOrganizador] = useState('');
    const [dataEvento, setDataEvento] = useState(null);
    const [tipo, setTipo] = useState('');
    const [endereco, setEndereco] = useState('');
    const [regiao, setRegiao] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [telefone, setTelefone] = useState('');
    const [foto, setFoto] = useState(null);
    const [linkEvento, setLinkEvento] = useState(''); 
    const [horario, setHorario] = useState(null);

    const navigate = useNavigate();

    // Regiões pré-definidas para o campo de seleção
    const predefinedRegions = ['Heliópolis', 'Ipiranga', 'Sacomã', 'Cursino', 'Outro'];

    // Carregar dados quando o componente é montado
    useEffect(() => {
        load();
    }, []);

    // Função para carregar dados do evento do servidor
    function load() {
        fetch(`https://api.helipaeventos.com.br/evento/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': token,
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            setData(data);
            setNome(data.nome);
            setOrganizador(data.organizador);
            setDataEvento(dayjs(data.data, "DD-MM-YYYY"));
            setTipo(data.tipo);
            setEndereco(data.endereco);
            setRegiao(data.regiao);
            setPreco(data.preco);
            setDescricao(data.descricao);
            setLinkEvento(data.link);
            setTelefone(data.telefone);
            setHorario(dayjs(data.horario, "HH:mm"));
        }).catch(response => {
            alert('Erro ao listar eventos!');
            alert(response.status);
        });
    }

    // Função para lidar com o clique no botão de salvar
    function click() {
        let dataEditada = {
            "nome": nome,
            "data": formatDateToString(dataEvento),
            "tipo": tipo,
            "endereco": endereco,
            "regiao": regiao,
            "preco": parseFloat(preco),
            "descricao": descricao,
            "organizador": organizador,
            "foto": foto,
            "horario": formatTimeToString(horario),
            "link": linkEvento,
            "telefone": telefone
        }

        fetch(`https://api.helipaeventos.com.br/evento/${id}`, {
            method: 'PUT',
            body: JSON.stringify(dataEditada),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }).then(response => {
            if (!response.ok) {
                // Tratamento de erro
                throw new Error('Erro na edição do evento!');
            }
            setOpen(true);
            setMessage("Evento editado com sucesso!");
        }).catch(response => {
            setOpen(true);
            setMessage('Erro na edição do evento!');
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
            <NavBar /> 
            <Grid item xs={12}>
                <Container>
                    <FormContainer elevation={0}>
                        {/* Botão para voltar à página de eventos */}
                        <IconButton onClick={() => navigate('/eventos')} sx={{ alignSelf: 'flex-start', '&:hover': { color: 'primary.main' } }}>
                            <ArrowBackIcon />
                        </IconButton>
                        {/* Título do formulário */}
                        <Typography variant="h4" align="center" style={{ margin: '20px', color: 'black', fontWeight: 'bold' }}>Editar evento</Typography>
                        <Typography color="black" align="center">Preencha esse formulário para editar seu evento</Typography>
                        {/* Formulário de edição de evento */}
                        <form action="" style={{ display: "flex", alignItems: "center", flexDirection: 'column', width: '100%' }}>
                            <CustomTextField fullWidth label='Nome do evento' value={nome} onChange={(event) => {
                                setNome(event.target.value);
                            }} />

                            {/* Campos de data e horário com suporte a internacionalização */}
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                                <CustomPaper elevation={0}>
                                    <DatePicker label="Data" slotProps={{ textField: { fullWidth: true, style: { backgroundColor: 'white', borderRadius: '5px' } } }} value={dataEvento} onChange={(newValue) => setDataEvento(newValue)} />
                                </CustomPaper>
                                <CustomPaper elevation={0}>
                                    <TimePicker label="Horário" value={horario} onChange={(newValue) => setHorario(newValue)} slotProps={{ textField: { fullWidth: true, style: { backgroundColor: 'white', borderRadius: '5px' } } }}/>
                                </CustomPaper>
                            </LocalizationProvider>

                            {/* Campo de endereço */}
                            <CustomTextField fullWidth label='Endereço' value={endereco} onChange={(event) => {
                                setEndereco(event.target.value);
                            }} />

                            {/* Campos de seleção de região e tipo de evento */}
                            <FormControl fullWidth style={{ margin: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
                                <InputLabel>Região</InputLabel>
                                <Select
                                    value={regiao}
                                    onChange={handleChangeRegiao}
                                    label="Região"
                                >
                                    {predefinedRegions.map((region) => (
                                        <MenuItem key={region} value={region}>
                                            {region}
                                        </MenuItem>
                                    ))}
                                    {!predefinedRegions.includes(regiao) && (
                                        <MenuItem value={regiao}>{regiao}</MenuItem>
                                    )}
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
                                </Select>
                            </FormControl>

                            {/* Campo de preço */}
                            <CustomTextField fullWidth label='Preço' type='number' InputProps={{
                                endAdornment: <InputAdornment position="start">R$</InputAdornment>
                            }} value={preco} onChange={(event) => {
                                setPreco(event.target.value);
                            }} />

                            {/* Campo de descrição com tooltip explicativo */}
                            <Tooltip title={descriptionTooltip} placement="top" arrow>
                                <CustomTextField fullWidth label='Descrição' multiline rows={5} value={descricao} onChange={(event) => {
                                    setDescricao(event.target.value);
                                }} />
                            </Tooltip>

                            {/* Campo de telefone com tooltip de formatação */}
                            <Tooltip title={phoneTooltip} placement="top" arrow>
                                <CustomTextField fullWidth label='Telefone' value={telefone} onChange={(event) => {
                                    setTelefone(event.target.value);
                                }} />
                            </Tooltip>

                            {/* Campo de link do evento */}
                            <CustomTextField fullWidth label="Link do Evento" value={linkEvento} onChange={(event) => {
                                setLinkEvento(event.target.value);
                            }} />

                            {/* Botão de submissão do formulário */}
                            <CustomButton variant="contained" color="primary" sx={{fontWeight:'bold'}} onClick={() => click()} endIcon={<SaveIcon />}>Salvar</CustomButton>
                        </form>
                        {/* Snackbar para exibir mensagens de sucesso ou erro */}
                        <Snackbar
                            open={open}
                            autoHideDuration={3000}
                            onClose={handleClose}
                            message={message}
                            action={action}
                        />
                    </FormContainer>
                </Container>
            </Grid>
        </MainContainer>
    );
}
