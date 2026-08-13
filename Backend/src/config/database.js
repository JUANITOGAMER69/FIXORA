import mongoose from "mongoose";
import env from "./env.js";

const conectarDB = async () => {

    try {

        await mongoose.connect(env.MONGODB_URI);

        console.log("✅ MongoDB Atlas conectado");

    } catch (error) {

        console.error("❌ Error al conectar MongoDB");

        console.error(error);

        process.exit(1);

    }

};

export default conectarDB;