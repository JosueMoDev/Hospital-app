import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { Environment } from "../envs";
import { OpenAPIV3 } from "openapi-types";
import { FromDtoToSchema } from "./fromDtoToSchema";
import * as paths from './api';

const swaggerOptions: OpenAPIV3.Document = {
  openapi: "3.1.1",
  info: {
    title: "THE CLINIC API - BUILD CON NODE AND EXPRESS.JS",
    version: "1.0.1",
    description:
      "This is the official documentation for a RESTful API built with Node.js, Express and MongoDB. It uses Prisma ORM and TypeScript, strictly following domain-driven design (DDD) principles.",
  },
  servers: [
    {
      url: `http://localhost:${Environment.PORT}/api/`,
      description: "Development server",
    },
  ],
  paths: {
    //! Authentication Paths
    "/authentication/login": paths.authentication.login,
    "/authentication/refresh-token": paths.authentication.refresh_token,

    // !Account Paths
    "/account/create": paths.account.create,
    "/account/update": paths.account.update,
    "/account/find-one/{id}": paths.account.find_one,
    "/account/find-by-document/{document}": paths.account.find_by_document,
    "/account/find-many": paths.account.find_many,
    "/account/change-status/{id}": paths.account.change_status,
    "/account/change-password": paths.account.change_password,
    "/account/confirm-password": paths.account.confirm_password,
    "/account/delete-photo": paths.account.delete_photo,
    "/account/upload-photo": paths.account.upload_photo,
    // !Appoinment Paths
    "/appointment/create": paths.appointment.create,
    "/appointment/update": paths.appointment.update,
    "/appointment/find-one/{id}": paths.appointment.find_one,
    "/appointment/find-many": paths.appointment.find_many,
    "/appointment/delete/{id}": paths.appointment.delete,
    // !Clinic Paths
    "/clinic/create": paths.clinic.create,
    "/clinic/update": paths.clinic.update,
    "/clinic/find-one/{id}": paths.clinic.find_one,
    "/clinic/find-many": paths.clinic.find_many,
    "/clinic/change-status": paths.clinic.change_status,
    "/clinic/upload-photo": paths.clinic.upload_photo,
    "/clinic/delete-photo": paths.clinic.delete_photo,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: FromDtoToSchema.getShemas() as any,
  },
};

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));
};
