const router = require('express').Router();
const { listar, actualizar, eliminar } = require('../controllers/usuarioController');
const { verifyToken, isAdmin } = require('../middlewares/authJwt');

router.get('/', verifyToken, isAdmin, listar);
router.put('/:id', verifyToken, isAdmin, actualizar);
router.delete('/:id', verifyToken, isAdmin, eliminar);

module.exports = router;
