//Middleware de autenticacion;
const tokenService = require('../services/token');

module.exports = {
    verifyUsuario: async(req, res, next) => {
        //console.log('Token de Verificar Usuario', req.headers);
        if (!req.headers.token) { //tokenReturn
            return res.status(404).send({
                message: 'No token'
            });
        } else {
            //console.log(req.headers.token);
            const response = await tokenService.decode(req.headers.token);
            console.log(response);
            if (response.rol == 'Administrador' || response.rol == 'Vendedor' || response.rol == 'Almacenero') {
                next();
            } else {
                return res.status(403).send({
                    message: 'No autorizado'
                });
            }
        }
    }
};