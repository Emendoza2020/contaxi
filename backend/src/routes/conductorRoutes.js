const router = require('express').Router();
const { registrarConductor, obtenerPerfil } = require('../controllers/conductorController');

router.post('/register-conductor', registrarConductor);
router.get('/perfil-conductor', obtenerPerfil);


module.exports = router;