const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/roles', require('./routes/rolRoutes'));


const PORT = process.env.PORT || 4000;

sequelize.authenticate()
  .then(() => console.log('✅ Conexión a BD correcta'))
  .catch(err => console.error('❌ Error de conexión:', err));

app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
