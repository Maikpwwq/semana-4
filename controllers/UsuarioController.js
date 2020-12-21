const models = require('../models');
const bcrypt = require('bcryptjs');
// Servicios
const tokenServices = require('../services/token');

const login = async(req, res, next) => {
	try {
		console.log(req.body.email)
		let user = await models.Usuario.findOne({ 
			where: { 
				email: req.body.email 
			},
		});
		if (user) {
			let match = await bcrypt.compare(req.body.password, user.password);
			console.log('match passwords compare')
			if (match) {
				let tokenReturn = await tokenServices.encode(user.id, user.rol);
				console.log(user.id, user.rol);
				res.status(200).json({ 
					tokenReturn, 
					auth: true 
				});
			} else {
				res.status(401).send({
					message: 'Password Incorrecto',
					auth: false,
                    tokenReturn: null,
				});
			}
		} else {
			res.status(404).send({
				message: 'No existe el usuario'
			});
		}
	} catch (e) {
		res.status(500).send({
			message: 'Ocurrió un error'
		});
		next(e);
	}
};


module.exports = {
	login
}