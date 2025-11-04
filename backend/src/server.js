import express from 'express';
import sequelize from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import personaRoutes from './routes/personaRoutes.js';
import rolRoutes from './routes/rolRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

// Conexión y sincronización DB
sequelize.authenticate()
    .then(() => console.log('✅ Conexión a BD correcta'))
    .catch(err => console.error('❌ Error de conexión:', err));

sequelize.sync({ alter: true })
    .then(() => console.log('📦 Base de datos sincronizada'))
    .catch(err => console.error('❌ Error sincronizando BD:', err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/personas', personaRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.get('/', (req, res) => res.send('🚀 Servidor funcionando'));

app.listen(PORT, () => console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`));