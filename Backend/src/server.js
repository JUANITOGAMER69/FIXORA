import app from "./app.js";

import conectarDB from "./config/database.js";

import env from "./config/env.js";

const iniciarServidor = async () => {

    try {

        await conectarDB();

        app.listen(env.PORT, () => {

            console.clear();

            console.log("==================================");

            console.log("🚀 Servidor FIXORA iniciado");

            console.log(`🌐 http://localhost:${env.PORT}`);

            console.log(`📚 Swagger: http://localhost:${env.PORT}/api/docs`);

            console.log("==================================");

        });

    } catch (error) {

        console.error("❌ Error al iniciar el servidor");

        console.error(error);

        process.exit(1);

    }

};

iniciarServidor();