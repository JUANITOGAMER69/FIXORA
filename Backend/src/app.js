import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import requestId from "./middlewares/requestId.js";
import rateLimit from "express-rate-limit";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

import routes from "./routes/index.js";

const app = express();

/* =========================================
   CONFIGURACIÓN GENERAL
========================================= */

app.disable("x-powered-by");

/* =========================================
   SEGURIDAD
========================================= */

app.use(helmet());

app.use(compression());


app.use(requestId);

/* =========================================
   CORS
========================================= */

app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ]
}));

/* =========================================
   COOKIES
========================================= */

app.use(cookieParser());

/* =========================================
   BODY PARSER
========================================= */

app.use(express.json({
    limit: "10mb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}));

/* =========================================
   RATE LIMIT
========================================= */

const limiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 100,

    standardHeaders: true,

    legacyHeaders: false,

    message: {

        success: false,

        message: "Demasiadas solicitudes. Intenta nuevamente más tarde."

    }

});

app.use(limiter);

/* =========================================
   SWAGGER
========================================= */

app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

/* =========================================
   RUTA PRINCIPAL
========================================= */

app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "🚀 API FIXORA funcionando correctamente."

    });

});

/* =========================================
   RUTAS
========================================= */

app.use("/api", routes);

/* =========================================
   RUTA NO ENCONTRADA
========================================= */

app.use(notFound);

/* =========================================
   MANEJO GLOBAL DE ERRORES
========================================= */

app.use(errorHandler);

export default app;