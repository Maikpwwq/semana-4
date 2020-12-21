/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const categoriaController = require('../../controllers/CategoriaController');
const auth = require('../../middlewares/auth');

const router = routerx();

router.get('/list', categoriaController.list);
// router.get('/query', auth.verifyUsuario, categoriaController.query);
// router.get('/queryCodigo', auth.verifyUsuario, categoriaController.queryCodigo);
router.post('/add', auth.verifyUsuario, categoriaController.add);
router.delete('/remove', auth.verifyUsuario, categoriaController.remove);
router.put('/update', auth.verifyUsuario, categoriaController.update);
router.put('/activate', auth.verifyUsuario, categoriaController.activate);
router.put('/deactivate', auth.verifyUsuario, categoriaController.deactivate);

module.exports = router;