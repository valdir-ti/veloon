import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Minha API Node + TypeScript",
      version: "1.0.0",
      description: "Documentação da API utilizando Swagger",
    },
    servers: [
      {
        url: "http://localhost:3333",
        description: "Servidor de Desenvolvimento",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
  tags: [
    {
      name: "Users",
      description: "Endpoints relacionados à criação de usuários",
    },
    {
      name: "Checagens",
      description:
        "Endpoints para verificar relações matemáticas entre números",
    },
    {
      name: "Histórico",
      description: "Endpoints para gerenciar o histórico de verificações",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Documentação disponível em: http://localhost:3333/api-docs");
};

export default swaggerDocs;
