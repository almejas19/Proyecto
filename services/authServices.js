const User = require('../config/user');

async function createUser(username, password, email, tipo) {
    try {
        // Asignar operaciones por tipo
        let operaciones_restantes = 3;
        if (tipo === 'estandar') {
            operaciones_restantes = 10;
        } else if (tipo === 'admin') {
            operaciones_restantes = 999999;
        }

        const user = await User.create({
            username,
            password,
            email,
            tipo,
            operaciones_restantes
        });

        return user;
    } catch (error) {
        console.error("Error creando usuario:", error);
        throw error;
    }
}

async function login(username, password) {
    try {
        const user = await User.findOne({
            where: { username, password },
            attributes: ['id', 'username', 'password', 'email', 'tipo', 'operaciones_restantes']
        });
        return user;
    } catch (error) {
        console.error("Error en login:", error);
        throw error;
    }
}

//exportar createUser
module.exports = { createUser, login };
