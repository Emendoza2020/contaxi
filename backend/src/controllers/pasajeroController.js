import bcrypt from "bcryptjs";
import Usuario from '../models/usuarioModel.js';
import Persona from '../models/personaModel.js';
import Rol from '../models/rolModel.js';
import Pasajero from "../models/pasajeroModel.js";


/**
 * Registrar un nuevo usuario con rol "pasajero" y crear registro en tabla Pasajero
 * POST /api/usuarios
 */
export const registrarPasajero = async(req, res) => {
    try {
        const { nombres, apellidos, ci, telefono, direccion, email, password } = req.body;

        if (!nombres || !apellidos || !ci || !email || !password) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }

        // Verificar duplicados
        const personaExistente = await Persona.findOne({ where: { ci } });
        if (personaExistente)
            return res.status(400).json({ message: "El CI ya está registrado" });

        const emailExistente = await Usuario.findOne({ where: { email } });
        if (emailExistente)
            return res.status(400).json({ message: "El correo ya está registrado" });

        // Buscar o crear el rol "pasajero"
        let rolPasajero = await Rol.findOne({ where: { nombre: "pasajero" } });
        if (!rolPasajero) {
            rolPasajero = await Rol.create({
                nombre: "pasajero",
                descripcion: "Usuario registrado como pasajero",
            });
            console.log("✅ Rol 'pasajero' creado automáticamente");
        }

        // Crear Persona
        const nuevaPersona = await Persona.create({
            nombres,
            apellidos,
            ci,
            telefono,
            direccion,
        });

        // Crear Pasajero vinculado
        const nuevoPasajero = await Pasajero.create({
            id_persona: nuevaPersona.id_persona,
        });

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear Usuario vinculado
        const nuevoUsuario = await Usuario.create({
            id_persona: nuevaPersona.id_persona,
            id_rol: rolPasajero.id_rol,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Usuario registrado correctamente como pasajero",
            usuario: {
                id_usuario: nuevoUsuario.id_usuario,
                email: nuevoUsuario.email,
                estado: nuevoUsuario.estado,
                rol: rolPasajero.nombre,
                persona: nuevaPersona,
                pasajero: nuevoPasajero,
            },
        });
    } catch (error) {
        console.error("❌ Error al registrar pasajero:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


// Listar todos los usuarios con su persona, rol y pasajero

export const listarPasajeros = async(req, res) => {
    try {
        const pasajeros = await Pasajero.findAll({
            include: [{
                    model: Persona,
                    attributes: ["nombres", "apellidos", "ci", "telefono", "direccion"]
                },
                {
                    model: Usuario,
                    attributes: ["email", "estado"],
                    include: [{ model: Rol, attributes: ["nombre"] }]
                }
            ]
        });
        res.status(200).json(pasajeros);
    } catch (error) {
        console.error("Error al listar pasajeros:", error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

//  Obtener un pasajero por ID

export const obtenerPasajero = async(req, res) => {
    try {
        const { id } = req.params;

        const pasajero = await Pasajero.findByPk(id, {
            include: [
                { model: Persona },
                {
                    model: Usuario,
                    include: [{ model: Rol, attributes: ["nombre"] }]
                }
            ]
        });

        if (!pasajero) return res.status(404).json({ message: "Pasajero no encontrado" });

        res.status(200).json(pasajero);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

/**
 * Actualizar datos del pasajero (persona y usuario)
 */
// export const actualizarPasajero = async(req, res) => {
//     try {
//         const { id } = req.params;
//         const { nombres, apellidos, telefono, direccion, estado } = req.body;

//         const pasajero = await Pasajero.findByPk(id, {
//             include: [{ model: Persona }, { model: Usuario }]
//         });

//         if (!pasajero) return res.status(404).json({ message: "Pasajero no encontrado" });

//         // Actualizar persona
//         await pasajero.Persona.update({ nombres, apellidos, telefono, direccion });

//         // Actualizar estado del usuario si se envía
//         if (estado) await pasajero.Usuario.update({ estado });

//         res.status(200).json({ message: "Pasajero actualizado correctamente" });
//     } catch (error) {
//         console.error("Error al actualizar pasajero:", error);
//         res.status(500).json({ message: "Error en el servidor", error });
//     }
// };

/**
 * Eliminar pasajero (modo admin)
 */
export const eliminarPasajero = async(req, res) => {
    try {
        const { id } = req.params;

        const pasajero = await Pasajero.findByPk(id);
        if (!pasajero) return res.status(404).json({ message: "Pasajero no encontrado" });

        await pasajero.destroy();

        res.status(200).json({ message: "Pasajero eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar pasajero:", error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
};