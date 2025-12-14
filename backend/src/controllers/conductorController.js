import bcrypt from 'bcrypt';
import Usuario from '../models/usuarioModel.js';
import Persona from '../models/personaModel.js';
import Rol from '../models/rolModel.js';
import Conductor from '../models/conductorModel.js';
import Vehiculo from '../models/vehiculoModel.js';
import '../models/index.js';

export const registrarConductor = async(req, res) => {
    const { nombres, apellidos, ci, telefono, direccion, email, password, licencia, categoria_licencia, vehiculos } = req.body;

    try {
        // Verificar si la CI o email ya existen
        const personaExist = await Persona.findOne({ where: { ci } });
        if (personaExist) return res.status(400).json({ message: 'CI ya registrado' });

        const usuarioExist = await Usuario.findOne({ where: { email } });
        if (usuarioExist) return res.status(400).json({ message: 'Email ya registrado' });

        // Crear Persona
        const persona = await Persona.create({ nombres, apellidos, ci, telefono, direccion });

        // Crear Usuario con rol conductor (por ejemplo id_rol = 2)
        const hashedPassword = await bcrypt.hash(password, 10);
        const usuario = await Usuario.create({
            id_persona: persona.id_persona,
            id_rol: 3, // suponer que 3 es conductor
            email,
            password: hashedPassword
        });

        // Crear Conductor
        const conductor = await Conductor.create({
            id_persona: persona.id_persona,
            licencia,
            categoria_licencia
        });

        // Crear Vehículos (si se envía un array)
        if (vehiculos && vehiculos.length > 0) {
            for (const v of vehiculos) {
                await Vehiculo.create({
                    id_conductor: conductor.id_conductor,
                    placa: v.placa,
                    marca: v.marca,
                    modelo: v.modelo,
                    anio: v.anio,
                    color: v.color,
                    capacidad: v.capacidad
                });
            }
        }

        res.status(201).json({ message: 'Conductor registrado exitosamente', conductorId: conductor.id_conductor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar conductor', error });
    }
};

/// Perfil Conductor

export const perfilConductor = async(id_conductor, res) => {
    try {
        const conductor = await Conductor.findOne({
            where: { id_conductor },
            include: [{
                    model: Persona,
                    attributes: ['nombres', 'apellidos', 'ci', 'telefono', 'direccion']
                },
                {
                    model: Usuario,
                    include: [{
                        model: Rol,
                        attributes: ['nombre', 'descripcion']
                    }],
                    attributes: ['email', 'estado']
                },
                {
                    model: Vehiculo,
                    attributes: ['placa', 'marca', 'modelo', 'anio', 'color', 'capacidad', 'estado']
                }
            ]
        });

        if (!conductor) return res.status(404).json({ message: 'Conductor no encontrado' });

        res.status(200).json({ conductor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener perfil', error });
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

export const obtenerConductores = async(req, res) => {
    try {
        const conductores = await Conductor.findAll({
            include: [{
                model: Persona, // Incluir la relación de Persona
                attributes: ['nombres', 'apellidos', 'telefono', 'direccion'] // Seleccionar los atributos que deseas mostrar
            }]
        });
        return res.status(200).json(conductores);
    } catch (error) {
        console.error('Error al obtener los conductores:', error);
        return res.status(500).json({ message: 'Error al obtener los conductores' });
    }
};