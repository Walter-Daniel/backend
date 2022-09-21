function isAdmin(req, res, next) {
    if( req.user.role !== 'ADMIN_ROLE' ) {
        return res.status(401).send({
            ok: false,
            message: 'No tienes permiso para realizar la acción'
        })
    };

    next();
}

module.exports = isAdmin;