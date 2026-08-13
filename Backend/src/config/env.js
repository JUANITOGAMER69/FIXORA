import dotenv from "dotenv";

dotenv.config();

const variablesObligatorias = [

    "MONGODB_URI",

    "JWT_SECRET",

    "CLOUDINARY_CLOUD_NAME",

    "CLOUDINARY_API_KEY",

    "CLOUDINARY_API_SECRET"

];

for (const variable of variablesObligatorias) {

    if (!process.env[variable]) {

        throw new Error(

            `La variable de entorno ${variable} no está definida.`

        );

    }

}

const env = {

    PORT: process.env.PORT || 4000,

    MONGODB_URI: process.env.MONGODB_URI,

    JWT_SECRET: process.env.JWT_SECRET,

    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",

    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,

    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,

    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET

};

export default env;