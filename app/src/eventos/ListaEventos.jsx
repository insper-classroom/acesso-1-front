import React, { useEffect, useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Grid, Paper, Typography, TextField, InputAdornment, Button, Select, MenuItem, IconButton, Snackbar, Box } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import 'dayjs/locale/pt-br';
import { DataGrid } from '@mui/x-data-grid';
import { EditaEventos } from './EditaEventos';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



export function ListaEventos() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        load();
    }, []);

    function load() {
        fetch('http://localhost:8080/evento', {
            method: 'GET'
        }).then(response => {
            return response.json();
        }).then(data => {
            setData(data);
        }).catch(response => {
            alert('Erro ao listar eventos!');
            alert(response.status);
        });
    }

    function deleteEvento(id) {
        fetch(`http://localhost:8080/evento/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erro ao deletar evento!');
            }
            setOpen(true);
            setMessage("Evento deletado com sucesso");
            load();
        }).catch(error => {
            setOpen(true);
            setMessage('Erro ao deletar evento!');
        });
    }

    const colunas = [
        { field: 'nome', headerName: 'Nome', flex: 1, minWidth: 100 },
        { field: 'organizador', headerName: 'Organizador', flex: 1, minWidth: 100 },
        { field: 'data', headerName: 'Data', flex: 1, minWidth: 100 },
        { field: 'tipo', headerName: 'Tipo', flex: 1, minWidth: 100, type: 'singleSelect', valueOptions: ['Tipo 1', 'Tipo 2', 'Tipo 3'] },
        { field: 'endereco', headerName: 'Endereco', flex: 1, minWidth: 100 },
        { field: 'regiao', headerName: 'Regiao', flex: 1, minWidth: 100 },
        { field: 'preco', headerName: 'Preço', flex: 1, minWidth: 100 },
        { field: 'descricao', headerName: 'Descrição', flex: 2, minWidth: 150 },
        { field: 'faixaEtaria', headerName: 'Faixa Etária', flex: 1, minWidth: 100 },
        {
            field: 'editar',
            headerName: 'Editar',
            flex: 1,
            minWidth: 100,
            renderCell: (params) => (
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="contained" color="primary" onClick={() => navigate(`/editaeventos/${params.id}`)}>Editar</Button>
                </div>
            )
        },
        {
            field: 'excluir',
            headerName: 'Excluir',
            flex: 1,
            minWidth: 100,
            renderCell: (params) => (
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="contained" color="error" onClick={() => deleteEvento(params.id)}>Excluir</Button>
                </div>
            )
        }
    ];

    return (
        <>
        <IconButton onClick={() => navigate('/')} sx={{
                        '&:hover': {
                            color: 'primary.main'
                        }
                    }}>
                    <ArrowBackIcon />
            </IconButton>
        
        <Grid container style={{ height: '100vh', width: '100%' }}>
            
            <Typography align='center' variant="h4" style={{ margin: '10px', color: 'black' }}>Meus eventos</Typography>
            <Grid item xs={12} style={{ height: '100%' }}>
                <div style={{ height: '100%', width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={colunas}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        autoHeight
                    />
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button 
                            variant='contained' 
                            sx={{ margin: '10px' }} 
                            endIcon={<AddIcon />} 
                            onClick={() => navigate('/cadastraeventos')}
                        >
                            Novo evento
                        </Button>
                    </Box>
                </div>
            </Grid>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message={message}
            />
        </Grid>
        </>
    );
}
