const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// --- BASE DE DATOS VOLÁTIL ---

// 1. Buses
let proximasSalidas = [
    { id: 1, hora: "16:20", destino: "Santiago", empresa: "Cóndor Bus", anden: "05", precio: 8500, servicios: ['wifi', 'ac'] },
    { id: 2, hora: "16:45", destino: "Rancagua", empresa: "TurBus", anden: "12", precio: 6000, servicios: ['ac'] },
    { id: 3, hora: "17:15", destino: "Chillán", empresa: "Buses Díaz", anden: "08", precio: 4500, servicios: [] },
    { id: 4, hora: "18:00", destino: "Concepción", empresa: "Pullman Bus", anden: "04", precio: 9000, servicios: ['wifi', 'usb'] },
    { id: 5, hora: "18:30", destino: "Linares", empresa: "TPL", anden: "02", precio: 2500, servicios: ['ac'] }
];

// 2. Eventos y Turismo (NUEVO)
let eventos = [
    { id: 1, tipo: 'cultura', titulo: "Gala de Ballet", lugar: "Teatro Regional del Maule", fecha: "Hoy, 20:00", img: "https://images.unsplash.com/photo-1514306191717-452ec28c7f42?auto=format&fit=crop&w=600&q=80" },
    { id: 2, tipo: 'turismo', titulo: "Ruta del Vino", lugar: "Valle del Maule", fecha: "Salidas Diarias", img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=600&q=80" },
    { id: 3, tipo: 'panorama', titulo: "Feria Gastronómica", lugar: "Plaza de Armas", fecha: "Este Finde", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80" }
];

// --- RUTAS API ---

// Buses
app.get('/api/salidas', (req, res) => res.json(proximasSalidas));
app.post('/api/salidas', (req, res) => {
    const nuevo = { ...req.body, id: Date.now(), servicios: ['ac'] };
    proximasSalidas.push(nuevo);
    proximasSalidas.sort((a, b) => a.hora.localeCompare(b.hora));
    res.json(nuevo);
});

// Eventos (NUEVO)
app.get('/api/eventos', (req, res) => res.json(eventos));
app.post('/api/eventos', (req, res) => {
    const nuevo = { ...req.body, id: Date.now() };
    eventos.unshift(nuevo); // Agregamos al principio
    res.json(nuevo);
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor Divano Innova listo en puerto ${PORT}`);
});