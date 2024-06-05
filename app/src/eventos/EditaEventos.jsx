import React, { Fragment, useEffect, useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Grid, Paper, Typography, TextField, InputAdornment, Button, Select, MenuItem, IconButton, Snackbar } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import 'dayjs/locale/pt-br';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import dayjs from 'dayjs';

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
        return moment(dateString, 'DD/MM/YYYY');
    };

    const { id } = useParams();
    const [data, setData] = useState([]);

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
            setFaixaEtaria(data.faixaEtaria);
        }).catch(response => {
            alert('Erro ao listar eventos!');
            alert(response.status);
        });
    }

    const [nome, setNome] = useState('');
    const [organizador, setOrganizador] = useState('');
    const [dataEvento, setDataEvento] = useState(null);
    const [tipo, setTipo] = useState('');
    const [endereco, setEndereco] = useState('');
    const [regiao, setRegiao] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [faixaEtaria, setFaixaEtaria] = useState('');
    const [foto, setFoto] = useState(null);
    const navigate = useNavigate();

    const predefinedRegions = ['Heliópolis', 'Ipiranga', 'Sacomã', 'Cursino', 'Outro'];

    function click() {
        let dataEditada = {
            "nome": nome,
            "data": formatDateToString(dataEvento),
            "tipo": tipo,
            "endereco": endereco,
            "regiao": regiao,
            "preco": preco,
            "descricao": descricao,
            "faixaEtaria": faixaEtaria,
            "organizador": organizador,
            "foto": foto
        }

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

    return (
        <>
            <IconButton onClick={() => navigate('/')} sx={{
                        '&:hover': {
                            color: 'primary.main'
                        }
                    }}>
                    <ArrowBackIcon />
            </IconButton>
            <Grid container alignItems="center" style={gridStyle}>
                
                <h2 style={{ color: 'black', textAlign: 'center', margin: '20px', flex: 1 }}>Editar evento </h2>
            </Grid>
            <Grid style={gridStyle}>
                <Typography color={'black'}>Preencha esse formulário para editar seu evento</Typography>
            </Grid>
            <form action="" style={{
                display: "flex",
                alignItems: "center",
                flexDirection: 'column',
            }}>
                <TextField fullWidth placeholder='Nome' style={formStyle} value={nome} onChange={(event) => {
                    setNome(event.target.value);
                }} />


                <Grid style={formStyle}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                        <DatePicker label="Data" slotProps={{ textField: { fullWidth: true } }} defaultValue={dayjs(data.data, "DD-MM-YYYY")} value={dataEvento} onChange={(newValue) => setDataEvento(newValue)} />
                    </LocalizationProvider>
                </Grid>

                <TextField fullWidth placeholder='Endereço' style={formStyle} value={endereco} onChange={(event) => {
                    setEndereco(event.target.value);
                }} />

                <FormControl fullWidth style={formStyle}>
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

                <FormControl fullWidth style={formStyle}>
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

                <TextField fullWidth placeholder='Preço' style={formStyle} InputProps={{
                    endAdornment: <InputAdornment position="start">R$</InputAdornment>
                }} value={preco} onChange={(event) => {
                    setPreco(event.target.value);
                }} />

                <TextField fullWidth placeholder='Descrição' style={formStyle} multiline rows={5} value={descricao} onChange={(event) => {
                    setDescricao(event.target.value);
                }} />

                <TextField fullWidth placeholder='Faixa Etária' style={formStyle} value={faixaEtaria} onChange={(event) => {
                    setFaixaEtaria(event.target.value);
                }} />

                <Button variant='contained' endIcon={<SaveIcon />} onClick={click}>
                    Salvar
                </Button>
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
