const bcrypt = require('bcrypt');
const { Usuario, Persona } = require('../models');
const dotenv = require('dotenv');
dotenv.config();


exports.registrarConductor = async(req, res) => {
    try {
        const { nombres, apellidos, ci, telefono, direccion, email, password, licencia, marca, modelo, color, anio, placa } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        const persona = await Persona.create({ nombres, apellidos, ci, telefono, direccion });
        const usuario = await Usuario.create({
            email,
            password: hashed,
            id_persona: persona.id,
            id_rol: id_rol || 3 // por defecto 'user'
        });


        res.json({ message: 'Usuario registrado exitosamente', usuario });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error en el registro', error: err.message });
    }
};

// ✅ OBTENER PERFIL
export const obtenerPerfil = async(req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(
            `SELECT p.nombres, p.apellidos, p.ci, p.telefono, u.email,
              c.licencia, c.marca, c.modelo, c.color, c.anio, c.placa
       FROM conductor c
       JOIN personas p ON c.persona_id = p.id
       JOIN usuarios u ON c.usuario_id = u.id
       WHERE c.id = ?`, [id]
        );

        if (rows.length === 0)
            return res.status(404).json({ message: "Conductor no encontrado." });

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener perfil." });
    }
};

// export const editarPerfil = async(req, res) => {
//     const { id } = req.params;
//     const { nombre, apellido, telefono, email, marca, modelo, color, anio, placa } = req.body;

//     try {
//         await db.query(
//             `UPDATE persona p JOIN conductor c ON p.id = c.persona_id
//        SET p.nombre=?, p.apellido=?, p.telefono=? WHERE c.id=?`, [nombre, apellido, telefono, id]
//         );

//         await db.query(
//             `UPDATE usuario u JOIN conductor c ON u.id = c.usuario_id
//        SET u.email=? WHERE c.id=?`, [email, id]
//         );

//         await db.query(
//             `UPDATE conductor SET marca=?, modelo=?, color=?, anio=?, placa=? WHERE id=?`, [marca, modelo, color, anio, placa, id]
//         );

//         res.json({ message: "Perfil actualizado correctamente." });
//     } catch (error) {
//         res.status(500).json({ message: "Error al actualizar." });
//     }
// };