import { Persona } from '../models/index.js';

export const listarPersonas = async(req, res) => {
    const personas = await Persona.findAll();
    res.json(personas);
};

export const crearPersona = async(req, res) => {
    const persona = await Persona.create(req.body);
    res.json(persona);
};

export const actualizarPersona = async(req, res) => {
    const { id } = req.params;
    await Persona.update(req.body, { where: { id_persona: id } });
    res.json({ message: 'Persona actualizada' });
};

export const eliminarPersona = async(req, res) => {
    const { id } = req.params;
    await Persona.destroy({ where: { id_persona: id } });
    res.json({ message: 'Persona eliminada' });
};