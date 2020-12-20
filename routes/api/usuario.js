/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const usuarioController = require('../../controllers/UsuarioController');
const auth = require('../../middlewares/auth');

const router = routerx();

router.post('/login', usuarioController.login);
router.get('/list', usuarioController.list);
router.get('/query', auth.verifyUsuario, usuarioController.query);
router.post('/add', auth.verifyUsuario, usuarioController.add);
router.delete('/remove', auth.verifyUsuario, usuarioController.remove);
router.put('/update', auth.verifyUsuario, usuarioController.update);
router.put('/activate', auth.verifyUsuario, usuarioController.activate);
router.put('/deactivate', auth.verifyUsuario, usuarioController.deactivate);

module.exports = router;