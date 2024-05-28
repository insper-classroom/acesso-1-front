import React from 'react'
import {FormGroup, FormControl, InputLabel, Input, Grid, Paper, Typography, TextField, InputAdornment, Button, Select, MenuItem} from "@mui/material"
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import SaveIcon from '@mui/icons-material/Save';
import 'dayjs/locale/pt-br'
 
export function CadastraEvento () {
    const paperStyle = {padding:'30px 20px', width:"100%"}
    const gridStyle = {margin:'10px'}
    const formStyle = {margin:'10px'}
    const [tipo, setTipo] = React.useState('');
    const handleChange = (event) => {
        setTipo(event.target.value);
    };

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid style={gridStyle}>
                    <h2>Novo evento</h2>
                    <Typography variant='caption'>Preencha esse formulário para cadastrar um novo evento</Typography>
                </Grid>
                <form action="" style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    flexDirection:'column',            }}>
                    <TextField fullWidth label='Nome do evento' style={formStyle}/>
                    <TextField fullWidth label='Organizador' style={formStyle}/>
                    <Grid style={formStyle}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                            <DatePicker label="Data" slotProps={{ textField: { fullWidth: true}}}/>
                        </LocalizationProvider>
                    </Grid>
                    <TextField fullWidth label='Endereço' style={formStyle}/>
                    <FormControl fullWidth>
                        <InputLabel>Tipo</InputLabel>
                        <Select
                            value={tipo}
                            onChange={handleChange}
                            label="Tipo"
                        >
                            <MenuItem value={'festa'}>Festa</MenuItem>
                            <MenuItem value={'cultural'}>Cultural</MenuItem>
                            <MenuItem value={'esportivo'}>Esportivo</MenuItem>
                            <MenuItem value={'religioso'}>Religioso</MenuItem>
                            <MenuItem value={'educacional'}>Educacional</MenuItem>
                            <MenuItem value={'academico'}>Acadêmico</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField fullWidth label='Preço' style={formStyle} InputProps={
                        {endAdornment: <InputAdornment position="start">R$</InputAdornment>}
                    }/>
                    <TextField fullWidth label='Descrição' style={formStyle} multiline rows={5}/>
                    <TextField fullWidth label='Faixa etária' style={formStyle}/>
                    <Button variant='contained' endIcon={<SaveIcon />}>Cadastrar</Button>
                </form>
            </Paper>
        </Grid>
    )
}