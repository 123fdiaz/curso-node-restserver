const { response, request } = require("express")

const validaRoleAdmin = (req = request, res = response, next) => {

    if(!req.usuarioAutenticado){
        return res.status(500).json({
            msg:'se quiere verificar rol sin validar toke'
        });
    }

    const {role, nombre} = req.usuarioAutenticado;    

    if(role !== 'ADMIN_ROLE') {

        return res.status(401).json({
            msg:'usuario con role sin permisos para operacion'
        });
    }

    next();
}

const tieneRoles = (...roles) => {

    return (req = request, res = response, next) => {

        if(!req.usuarioAutenticado){
            return res.status(500).json({
                msg:'se quiere verificar rol sin validar toke'
            });
        }

        if(!roles.includes( req.usuarioAutenticado.role)) {

            return res.status(500).json({
                msg:'Usuario con role no valido'
            });
        }
        next();
    };
}


module.exports = {
    validaRoleAdmin,
    tieneRoles
}