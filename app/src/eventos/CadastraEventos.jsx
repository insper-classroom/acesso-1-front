import React, { Fragment, useState } from 'react'
import {FormGroup, FormControl, InputLabel, Input, Grid, Paper, Typography, TextField, InputAdornment, Button, Select, MenuItem, IconButton, Snackbar} from "@mui/material"
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import 'dayjs/locale/pt-br'
 
export function CadastraEvento () {
    const paperStyle = {padding:'30px 20px', width:"100%"}
    const gridStyle = {margin:'10px'}
    const formStyle = {margin:'10px'}
    
    const handleChangeTipo = (event) => {
        setTipo(event.target.value);
    };

    const handleChangeRegiao = (event) => {
        setRegiao(event.target.value);
    };

    const [nome, setNome] = React.useState();
    const [organizador, setOrganizador] = React.useState();
    const [dataEvento, setDataEvento] = React.useState();
    const [tipo, setTipo] = React.useState('');
    const [endereco, setEndereco] = React.useState();
    const [regiao, setRegiao] = React.useState();
    const [preco, setPreco] = React.useState();
    const [descricao, setDescricao] = React.useState();
    const [faixaEtaria, setFaixaEtaria] = React.useState();

    const [open, setOpen] = useState(false)

    const [message, setMessage] = useState()

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

    const formatDateToString = (date) => {
        if (!date) return '';
        return date.format('DD/MM/YYYY'); // Formato para português do Brasil
    };

    function click() {
        let data = {
            "nome": nome,
            "data": formatDateToString(dataEvento),
            "tipo": tipo,
            "endereco": endereco,
            "regiao": regiao,
            "preco": preco,
            "descricao": descricao,
            "faixaEtaria": faixaEtaria
        }
    
        fetch('http://localhost:8080/evento/665f56f55237a07cc9331462', {
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
          setMessage("Evento cadastrado com sucesso!")
          //load()
        }).catch(response => {
            setOpen(true)
            setMessage('Erro no cadastro do evento!')
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
                    <Grid style={gridStyle}>
                        <h2 style={{color: 'black', textAlign:'center', margin: '20px'}}>Novo evento</h2>
                        <Typography color={'black'}>Preencha esse formulário para cadastrar um novo evento</Typography>
                    </Grid>
                    <form action="" style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection:'column',            }}>
                        <TextField fullWidth label='Nome do evento' style={formStyle} value={nome} onChange={(event) => {
                            setNome(event.target.value);}}/>

                        <Grid style={formStyle}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                                <DatePicker label="Data" slotProps={{ textField: { fullWidth: true}}} value={dataEvento} onChange={(newValue) => setDataEvento(newValue)}/>
                            </LocalizationProvider>
                        </Grid>
                        
                        <TextField fullWidth label='Endereço' style={formStyle} value={endereco} onChange={(event) => {
                            setEndereco(event.target.value);}}/>
                        <FormControl fullWidth style={formStyle}>
                            <InputLabel>Região</InputLabel>
                            <Select
                                value={regiao}
                                onChange={handleChangeRegiao}
                                label="Regiao"
                                
                            >
                                <MenuItem value={'Heliópolis'}>Heliópolis</MenuItem>
                                <MenuItem value={'Ipiranga'}>Ipiranga</MenuItem>
                                <MenuItem value={'Sacomã'}>Sacomã</MenuItem>
                                <MenuItem value={'Cursino'}>Cursino</MenuItem>
                                <MenuItem value={'Outro'}>Outro</MenuItem>
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
                        <TextField fullWidth label='Preço' style={formStyle} InputProps={
                            {endAdornment: <InputAdornment position="start">R$</InputAdornment>}
                        } value={preco} onChange={(event) => {
                            setPreco(event.target.value);}}/>
                        <TextField fullWidth label='Descrição' style={formStyle} multiline rows={5} value={descricao} onChange={(event) => {
                            setDescricao(event.target.value);}}/>
                        <TextField fullWidth label='Faixa etária' style={formStyle} value={faixaEtaria} onChange={(event) => {
                            setFaixaEtaria(event.target.value);}}/>
                        <Button variant='contained' endIcon={<SaveIcon />} onClick={() => click(0)}>Cadastrar</Button>
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