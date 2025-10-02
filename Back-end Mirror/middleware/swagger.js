const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Définition de la config OpenAPI
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Projet CT",
      version: "1.0.0",
      description: "Documentation de l'API avec Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000", // ton serveur local
      },
    ],
  },
  apis: ["../routes/*.js"], // chemins des fichiers où tu mettras les commentaires Swagger
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
