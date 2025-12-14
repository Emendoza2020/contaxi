import bcrypt from 'bcrypt';
import Usuario from '../models/usuarioModel.js';
import Persona from '../models/personaModel.js';
import Rol from '../models/rolModel.js';
import '../models/index.js';

export const listarUsuario = async(req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ['password'] },
            include: [Persona, Rol],
            order: [
                ['id_usuario', 'ASC']
            ]
        });

        return res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al listar usuarios:', error);
        return res.status(500).json({
            message: 'Error interno al obtener los usuarios',
            error: error.message
        });
    }
};

export const crearUsuario = async(req, res) => {
    try {
        const {
            nombres,
            apellidos,
            ci,
            telefono,
            direccion,
            email,
            password,
            id_rol, // id del rol que seleccionas en el formulario
        } = req.body;

        // 1) Validar campos obligatorios
        if (!nombres ||
            !apellidos ||
            !ci ||
            !telefono ||
            !direccion ||
            !email ||
            !password ||
            !id_rol
        ) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios',
            });
        }

        // 2) Verificar si ya existe un usuario con ese email
        const existeEmail = await Usuario.findOne({ where: { email } });
        if (existeEmail) {
            return res.status(400).json({
                message: 'El correo electrónico ya está registrado',
            });
        }

        // 3) (Opcional) Verificar CI duplicado en Persona
        const existeCi = await Persona.findOne({ where: { ci } });
        if (existeCi) {
            return res.status(400).json({
                message: 'El número de C.I. ya está registrado',
            });
        }

        // 4) Crear la Persona
        const nuevaPersona = await Persona.create({
            nombres,
            apellidos,
            ci,
            telefono,
            direccion,
            // fecha_registro se llena solo por defaultValue
        });

        // 5) Hashear el password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 6) Crear el Usuario que referencia a la Persona
        const nuevoUsuario = await Usuario.create({
            id_persona: nuevaPersona.id_persona,
            id_rol,
            email,
            password: hashedPassword,
            // estado y fecha_registro usan sus defaultValue
        });

        // 7) Respuesta al cliente
        return res.status(201).json({
            message: 'Usuario creado correctamente',
            usuario: {
                id_usuario: nuevoUsuario.id_usuario,
                email: nuevoUsuario.email,
                estado: nuevoUsuario.estado,
                id_rol: nuevoUsuario.id_rol,
            },
            persona: {
                id_persona: nuevaPersona.id_persona,
                nombres: nuevaPersona.nombres,
                apellidos: nuevaPersona.apellidos,
                ci: nuevaPersona.ci,
                telefono: nuevaPersona.telefono,
                direccion: nuevaPersona.direccion,
            },
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return res.status(500).json({
            message: 'Error interno al crear el usuario',
            error: error.message,
        });
    }
};

export const actualizarUsuario = async(req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el usuario existe
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Obtener la persona asociada
        const persona = await Persona.findByPk(usuario.id_persona);
        if (!persona) {
            return res.status(404).json({ message: 'Persona asociada no encontrada' });
        }

        const {
            nombres,
            apellidos,
            ci,
            telefono,
            direccion,
            email,
            password,
            id_rol,
            estado,
        } = req.body;

        // Validación mínima
        if (!nombres || !apellidos || !ci || !telefono || !direccion || !email || !id_rol) {
            return res.status(400).json({
                message: 'Todos los campos obligatorios deben estar llenos'
            });
        }

        // Verificar si el nuevo email ya existe en otro usuario
        const emailExistente = await Usuario.findOne({
            where: { email },
        });

        if (emailExistente && emailExistente.id_usuario !== Number(id)) {
            return res.status(400).json({
                message: 'El correo electrónico ya está registrado por otro usuario'
            });
        }

        // Verificar CI duplicado
        const ciExistente = await Persona.findOne({
            where: { ci }
        });

        if (ciExistente && ciExistente.id_persona !== persona.id_persona) {
            return res.status(400).json({
                message: 'El número de C.I. ya está registrado por otra persona'
            });
        }

        // Actualizar Persona
        await persona.update({
            nombres,
            apellidos,
            ci,
            telefono,
            direccion,
        });

        // Preparar los datos que sí pueden actualizarse en Usuario
        const datosUsuario = {
            email,
            id_rol,
            estado,
        };

        // Si envías contraseña, se actualiza
        if (password) {
            datosUsuario.password = await bcrypt.hash(password, 10);
        }

        // Actualizar Usuario
        await usuario.update(datosUsuario);

        return res.status(200).json({
            message: 'Usuario actualizado correctamente',
            usuario: {
                id_usuario: usuario.id_usuario,
                email: usuario.email,
                estado: usuario.estado,
                id_rol: usuario.id_rol,
            },
            persona: {
                id_persona: persona.id_persona,
                nombres: persona.nombres,
                apellidos: persona.apellidos,
                ci: persona.ci,
                telefono: persona.telefono,
                direccion: persona.direccion,
            },
        });

    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        return res.status(500).json({
            message: 'Error interno al actualizar el usuario',
            error: error.message
        });
    }
};

export const eliminarUsuario = async(req, res) => {
    try {
        const { id } = req.params;
        // Buscar usuario
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const idPersona = usuario.id_persona;

        // 1) Eliminar usuario
        await usuario.destroy();

        // 2) (Opcional) Eliminar también la persona relacionada
        if (idPersona) {
            await Persona.destroy({ where: { id_persona: idPersona } });
        }
        return res.status(200).json({
            message: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        return res.status(500).json({
            message: 'Error interno al eliminar el usuario',
            error: error.message
        });
    }
};


export const actualizarEstado = async(req, res) => {
    try {
        const id = Number(req.params.id);
        const { estado } = req.body;

        console.log('ID recibido en backend:', id, 'nuevo estado:', estado);

        // Validación básica del ID
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        // Buscar por la columna real de la tabla
        const usuario = await Usuario.findOne({ where: { id_usuario: id } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontradosssssssssss' });
        }

        await usuario.update({ estado });

        return res.status(200).json({
            message: `Estado actualizado a ${estado}`,
            data: {
                id_usuario: usuario.id_usuario,
                estado: usuario.estado,
            },
        });

    } catch (error) {
        console.error('Error al cambiar el estado:', error);
        return res.status(500).json({
            message: 'Error interno al cambiar el estado',
            error: error.message,
        });
    }
};




export const getUsuarios = async(req, res) => {
    try {
        const usuarios = await Usuario.findAll({ include: [Persona, Rol] });
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ message: 'Error obteniendo usuarios', error: err.message });
    }
};
export const getUsuarioById = async(req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id, { include: [Persona, Rol] });
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ message: 'Error obteniendo usuario', error: err.message });
    }
};

export const perfilUsuario = async(req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findOne({
            where: { id_usuario: id },
            include: [
                { model: Persona },
                { model: Rol }
            ]
        });
        if (!usuario)
            return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener perfil", error });
    }
};

export const validateCI = async(req, res) => {
    const { ci } = req.body;
    if (!ci) return res.status(400).json({ message: 'CI es requerido' });

    try {
        const exists = await Persona.findOne({ where: { ci } });
        res.json({ exists: !!exists });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al validar CI' });
    }
};

export const validateEmail = async(req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email es requerido' });

    try {
        const exists = await Usuario.findOne({ where: { email } });
        res.json({ exists: !!exists });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al validar email' });
    }
};