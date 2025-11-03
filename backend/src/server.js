// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const { sequelize } = require('./models');
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Rutas
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/usuarios', require('./routes/usuarioRoutes'));
// app.use('/api/roles', require('./routes/rolRoutes'));

// app.use('/api/conductor', require('./routes/conductorRoutes'));


// const PORT = process.env.PORT || 4000;

// sequelize.authenticate()
//     .then(() => console.log('✅ Conexión a BD correcta'))
//     .catch(err => console.error('❌ Error de conexión:', err));

// app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));

import dotenv from 'dotenv';
import app from './app.js';
import { sequelize, Rol, Region } from './models/index.js';

dotenv.config();
const PORT = process.env.PORT;

const iniciarServidor = async() => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conectado a MySQL');

        await sequelize.sync({ alter: true });
        console.log('📦 Tablas sincronizadas');

        // Semillas iniciales
        await Rol.bulkCreate([
            { nombre: 'Administrador', descripcion: 'Control total del sistema' },
            { nombre: 'Conductor', descripcion: 'Usuario que transporta pasajeros' },
            { nombre: 'Pasajero', descripcion: 'Usuario que solicita viajes' }
        ], { ignoreDuplicates: true });

        await Region.findOrCreate({
            where: { departamento: 'La Paz', provincia: 'Omasuyos', municipio: 'Achacachi' },
            defaults: { descripcion: 'Región habilitada para viajes' }
        });

        app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
    } catch (error) {
        console.error('❌ Error al iniciar servidor:', error);
    }
};
iniciarServidor();