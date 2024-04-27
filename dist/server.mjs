import {
  registerForEvent
} from "./chunk-YZTYSFFE.mjs";
import {
  errorHandler
} from "./chunk-VBSP4R33.mjs";
import {
  checkin
} from "./chunk-2H3KD6QE.mjs";
import {
  createEvent
} from "./chunk-MPE4MYBG.mjs";
import "./chunk-D522ZAIR.mjs";
import {
  getAttendeeBadge
} from "./chunk-QOH2CITT.mjs";
import {
  getEventAttendees
} from "./chunk-POHBZCWE.mjs";
import {
  getEvent
} from "./chunk-DDBSJ7KN.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";
var app = fastify().withTypeProvider();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "Event check-in tool",
      description: "Especifica\xE7\xF5es relacionadas \xE0s rotas de cria\xE7\xE3o de evento, cadastro de participante e check-in",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkin);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP Server Running");
});
