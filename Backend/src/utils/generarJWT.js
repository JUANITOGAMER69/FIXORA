import jwt from "jsonwebtoken";

export const generarAccessToken = (usuario) => {

    return jwt.sign(
        {
            id: usuario._id,
            rol: usuario.rol
        },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );

};

export const generarRefreshToken = (usuario) => {

    return jwt.sign(
        {
            id: usuario._id
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );

};