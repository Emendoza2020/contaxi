const router = require('express').Router();
const { listar, crear, actualizar, eliminar } = require('../controllers/rolController');
const { verifyToken, isAdmin } = require('../middlewares/authJwt');

// Solo los administradores pueden gestionar roles
router.get('/', verifyToken, isAdmin, listar);
router.post('/', verifyToken, isAdmin, crear);
router.put('/:id', verifyToken, isAdmin, actualizar);
router.delete('/:id', verifyToken, isAdmin, eliminar);

module.exports = router;
