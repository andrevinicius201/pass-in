import fastify from "fastify"

import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUI from "@fastify/swagger-ui"

import { serializerCompiler, validatorCompiler, jsonSchemaTransform, ZodTypeProvider } from "fastify-type-provider-zod"
import { createEvent } from "./routes/create-event"
import { errorHandler } from "./error-handler"
import { registerForEvent } from "./routes/register-for-event"
import { getEvent } from "./routes/get-event"
import { getAttendeeBadge } from "./routes/get-attendee-badge"
import { checkin } from "./routes/checkin"
import { getEventAttendees } from "./routes/get-event-attendees"
import fastifyCors from "@fastify/cors"


const app = fastify().withTypeProvider<ZodTypeProvider>()


app.register(fastifyCors, {
    origin: '*'
})

app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: 'Event check-in tool',
            description: 'Especificações relacionadas às rotas de criação de evento, cadastro de participante e check-in',
            version: '1.0.0'
        }
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUI, {
    routePrefix: '/docs'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkin)
app.register(getEventAttendees)

app.setErrorHandler(errorHandler)

app.listen({port:3333, host:'0.0.0.0'}).then(() => {
    console.log('HTTP Server Running')
})