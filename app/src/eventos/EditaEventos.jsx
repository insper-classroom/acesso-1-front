import React, { Fragment, useEffect, useState } from 'react';
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

export function EditaEventos() {
    const paperStyle = { padding: '30px 20px', width: "100%" };
    const gridStyle = { margin: '10px' };
    const formStyle = { margin: '10px' };

    const handleChangeTipo = (event) => {
        setTipo(event.target.value);
    };

    const handleChangeRegiao = (event) => {
        setRegiao(event.target.value);
    };

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState();

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

    const formatDateToString = (date) => {
        if (!date) return '';
        return date.format('DD/MM/YYYY'); // Formato para português do Brasil
    };

    const formatStringToDate = (dateString) => {
        if (!dateString) return null;
        return dayjs(dateString, 'DD/MM/YYYY');
    };

    const formatTimeToString = (time) => {
        if (!time) return '';
        return time.format('HH:mm');
    };

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

    const predefinedRegions = ['Heliópolis', 'Ipiranga', 'Sacomã', 'Cursino', 'Outro'];

    useEffect(() => {
        load();
    }, []);

    function load() {
        fetch(`http://localhost:8080/evento/${id}`, {
            method: 'GET'
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
            setLinkEvento(data.link); // Ajuste aqui para garantir que linkEvento seja setado corretamente
            setTelefone(data.telefone);
            setHorario(dayjs(data.horario, "HH:mm"));
        }).catch(response => {
            alert('Erro ao listar eventos!');
            alert(response.status);
        });
    }

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
            "linkEvento": linkEvento
        }

        console.log("oi");

        fetch(`http://localhost:8080/evento/${id}`, {
            method: 'PUT',
            body: JSON.stringify(dataEditada),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
                // error processing
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

    const descriptionTooltip = (
        <ul>
            <li>Descreva o evento de forma clara e concisa</li>
            <li>Inclua informações relevantes como atrações e atividades</li>
            <li>Mencione se há necessidade de inscrição prévia ou restrições de idade</li>
        </ul>
    );

    const phoneTooltip = "O formato deve ser (DD)XXXXXXXXX";

    return (
        <div style={{padding: "5%"}}>
            <IconButton onClick={() => navigate('/eventos')} sx={{
                        '&:hover': {
                            color: 'primary.main'
                        }
                    }}>
                    <ArrowBackIcon />
            </IconButton>
            <Grid container alignItems="center" style={gridStyle}>
                <h2 style={{ color: 'black', textAlign: 'center', margin: '20px', flex: 1 }}>Editar evento</h2>
            </Grid>
            <Grid style={gridStyle}>
                <Typography color={'black'}>Preencha esse formulário para editar seu evento</Typography>
            </Grid>
            <form action="" style={{
                display: "flex",
                alignItems: "center",
                flexDirection: 'column',
                backgroundColor: "#f0f0f0", 
                padding: "20px", 
                borderRadius: "10px" 
            }}>
                <TextField fullWidth label='Nome do evento' style={{ margin: '10px', backgroundColor: 'white', borderRadius: '5px' }} value={nome} onChange={(event) => {
                    setNome(event.target.value);
                }} />

                <Grid style={formStyle}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                        <DatePicker label="Data" slotProps={{ textField: { fullWidth: true, style: { backgroundColor: 'white' } } }} value={dataEvento} onChange={(newValue) => setDataEvento(newValue)} />
                    </LocalizationProvider>
                </Grid>

                <Grid style={formStyle}>
                    <Paper style={{backgroundColor: 'white', borderRadius: '5px', boxShadow: 'none'}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                            <TimePicker label="Horário" value={horario} onChange={(newValue) => setHorario(newValue)}/>
                        </LocalizationProvider>
                    </Paper>
                </Grid>

                <TextField fullWidth label='Endereço' style={{ margin: '10px', backgroundColor: 'white', borderRadius: '5px' }} value={endereco} onChange={(event) => {
                    setEndereco(event.target.value);
                }} />

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

                <TextField fullWidth label='Preço' style={{ margin: '10px', backgroundColor: 'white', borderRadius: '5px' }} type='number' InputProps={{
                    endAdornment: <InputAdornment position="start">R$</InputAdornment>
                }} value={preco} onChange={(event) => {
                    setPreco(event.target.value);
                }} />

                <Tooltip title={descriptionTooltip} placement="top" arrow>
                    <TextField fullWidth label='Descrição' style={{ margin: '10px', backgroundColor: 'white', borderRadius: '5px' }} multiline rows={5} value={descricao} onChange={(event) => {
                        setDescricao(event.target.value);
                    }} />
                </Tooltip>

                <TextField fullWidth label='Telefone' style={{ margin: '10px', backgroundColor: 'white', borderRadius: '5px' }} value={telefone} onChange={(event) => {
                    setTelefone(event.target.value);
                }} />

                <TextField fullWidth label="Link do Evento" style={{ margin: '10px', backgroundColor: 'white', borderRadius: '5px' }} value={linkEvento} onChange={(event) => {
                    setLinkEvento(event.target.value);
                }} />

                <Button variant="contained" onClick={() => click()} style={formStyle} endIcon={<SaveIcon />}>Salvar</Button>
            </form>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={message}
                action={action}
            />
        </div>
    );
}
