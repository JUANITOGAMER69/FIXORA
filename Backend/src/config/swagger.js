import swaggerJSDoc from "swagger-jsdoc";

const options = {

    definition: {

        openapi: "3.0.3",

        info: {

            title: "FIXORA API",

            version: "1.0.0",

            description:
                "API REST oficial de FIXORA."

        },

        servers: [

            {

                url: "http://localhost:4000",

                description: "Servidor Local"

            }

        ],

        components: {

            securitySchemes: {

                bearerAuth: {

                    type: "http",

                    scheme: "bearer",

                    bearerFormat: "JWT"

                }

            }

        },

        security: [

            {

                bearerAuth: []

            }

        ]

    },

    apis: [

        "./src/routes/*.js"

    ]

};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;