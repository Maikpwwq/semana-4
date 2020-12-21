/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const articuloController = require('../../controllers/ArticuloController');
const auth = require('../../middlewares/auth');

const router = routerx();

router.get('/list', articuloController.list);
// router.get('/query', auth.verifyUsuario, articuloController.query);
// router.get('/queryCodigo', auth.verifyUsuario, articuloController.queryCodigo);
router.post('/add', auth.verifyUsuario, articuloController.add);
router.delete('/remove', auth.verifyUsuario, articuloController.remove);
router.put('/update', auth.verifyUsuario, articuloController.update);
router.put('/activate', auth.verifyUsuario, articuloController.activate);
router.put('/deactivate', auth.verifyUsuario, articuloController.deactivate);

module.exports = router;