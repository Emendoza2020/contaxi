import express from "express";
import sequelize from "./config/database.js";

import authRoutes from "./routes/authRoutes.js";
import personaRoutes from "./routes/personaRoutes.js";
import rolRoutes from "./routes/rolRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import pasajeroRoutes from "./routes/pasajeroRoutes.js";
import conductorRoutes from "./routes/conductorRoutes.js";
import solicitudViajeRoutes from "./routes/solicitudViajeRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import cors from "cors";


const app = express();

app.use(cors({
    origin: 'http://localhost:4200', // Asegúrate de que el frontend esté en este puerto
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const PORT = process.env.PORT;

// Conexión y sincronización DB
sequelize
    .authenticate()
    .then(() => console.log("✅ Conexión a BD correcta"))
    .catch((err) => console.error("❌ Error de conexión:", err));

sequelize
    .sync({ alter: true })
    .then(() => console.log("📦 Base de datos sincronizada"))
    .catch((err) => console.error("❌ Error sincronizando BD:", err));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/personas", personaRoutes);
app.use("/api/roles", rolRoutes);
app.use("/api/usuarios", usuarioRoutes);

app.use("/api/pasajeros", pasajeroRoutes);
app.use("/api/conductor", conductorRoutes);

app.use("/api/solicitud", solicitudViajeRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => res.send("🚀 Servidor funcionando"));

app.listen(PORT, () =>
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`)
);