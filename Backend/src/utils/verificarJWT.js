import jwt from "jsonwebtoken";

const verificarJWT = (token) => {

    return jwt.verify(
        token,
        process.env.JWT_SECRET
    );

};

export default verificarJWT;