import Persona from '../models/personaModel.js';

export const createPersona = async(req, res) => {
    const { nombres, apellidos, ci } = req.body;
    if (!nombres || !apellidos || !ci) return res.status(400).json({ message: 'Faltan campos obligatorios' });

    try {
        const persona = await Persona.create(req.body);
        res.status(201).json(persona);
    } catch (err) {
        res.status(500).json({ message: 'Error creando persona', error: err.message });
    }
};

export const getPersonas = async(req, res) => {
    try {
        const personas = await Persona.findAll();
        res.json(personas);
    } catch (err) {
        res.status(500).json({ message: 'Error obteniendo personas', error: err.message });
    }
};

export const getPersonaById = async(req, res) => {
    try {
        const persona = await Persona.findByPk(req.params.id);
        if (!persona) return res.status(404).json({ message: 'Persona no encontrada' });
        res.json(persona);
    } catch (err) {
        res.status(500).json({ message: 'Error obteniendo persona', error: err.message });
    }
};

export const updatePersona = async(req, res) => {
    try {
        const persona = await Persona.findByPk(req.params.id);
        if (!persona) return res.status(404).json({ message: 'Persona no encontrada' });

        await persona.update(req.body);
        res.json(persona);
    } catch (err) {
        res.status(500).json({ message: 'Error actualizando persona', error: err.message });
    }
};

export const deletePersona = async(req, res) => {
    try {
        const persona = await Persona.findByPk(req.params.id);
        if (!persona) return res.status(404).json({ message: 'Persona no encontrada' });

        await persona.destroy();
        res.json({ message: 'Persona eliminada' });
    } catch (err) {
        res.status(500).json({ message: 'Error eliminando persona', error: err.message });
    }
};