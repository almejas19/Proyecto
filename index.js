const prompt = require('prompt-sync')();
const sequelize = require('./config/database');
const { createUser, login } = require('./services/authServices');
const { ejecutarOperaciones } = require('./operaciones/ejecutarOperaciones');

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');

        let accion = "";

        while (accion !== "exit") {
            const action = prompt('Elige una opción (crear/login/exit): ').toLowerCase();

            if (action === "crear") {
                console.log("Creando usuario...");
                const username = prompt('Introduce el nombre de usuario: ');
                const password = prompt('Introduce la contraseña: ');
                const email = prompt('Introduce el correo electrónico: ');

                let tipo = "";
                while (!["admin", "estandar", "invitado"].includes(tipo)) {
                    tipo = prompt("Tipo de usuario (admin/estandar/invitado): ").toLowerCase();
                }

                const nuevoUsuario = await createUser(username, password, email, tipo);
                console.log("✅ Usuario creado:", nuevoUsuario.toJSON());
            }

            else if (action === "login") {
                console.log("Iniciando sesión...");
                const username = prompt('Introduce el nombre de usuario: ');
                const password = prompt('Introduce la contraseña: ');

                const getUser = await login(username, password);
                if (getUser) {
                    const datos = getUser.toJSON();
                    console.log(`✅ Bienvenido ${datos.username}, has iniciado sesión como: ${datos.tipo.toUpperCase()}`);
                    await ejecutarOperaciones(datos);
                } else {
                    console.log("❌ Usuario no encontrado o contraseña incorrecta.");
                }
            }

            else if (action === "exit") {
                console.log("👋 Saliendo del sistema...");
                accion = "exit";
            }

            else {
                console.log("❓ Opción no válida. Escribe 'crear', 'login' o 'exit'.");
            }
        }
    } catch (error) {
        console.error('❌ Error conectando a la base de datos:', error);
    }
}

main();
