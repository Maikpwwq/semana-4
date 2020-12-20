var jwt = require('jsonwebtoken');
const models = require('../models');
const config = require('../secret/config.js');

const checkToken = async ( token ) => {
    let _id = null;
    
    try {
        const { id } = await token.decode(token);
        _id = id;
        console.log( _id );
    } catch ( error ) {
        return false;
    };
    
    const user = await models.usuario.findOne({
        where: { id: _id, estado: 1 }
    }); 
    
    if ( user ) {
        const token = jws.sign({ _id: _id}, config.secret, {expires:'1d'}); 
        return {
            token, 
            rol: user.rol
        }
    } else {
        return false
    }
};

module.exports = {

    //generar el token
    encode: async(_id, rol) => {
        const token = jwt.sign({_id:_id, rol:rol}, config.secret, {expires:'1d'});
        return token
    },
    //permite decodificar el token
    decode: async(token) => {
        try {
            //const {id, name, email, rol, estado}
            const { id } = await jws.verify(token, config.secret); 
            const user = await models.usuario.findOne({
                where: { id: id, estado: 1 }
            });
            if (user) {
                return user
            } else {
                return false
            }
        } catch (error) {
            const newToken = await checkToken(token);
            return newToken
        };
    }
}