import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";

export async function checkin(app: FastifyInstance){
    app
    .withTypeProvider<ZodTypeProvider>()
    .get('/attendees/:attendeeId/check-in', {
        schema: {
            summary: 'Check-in attendee',
            tags:['attendees'],
            params: z.object({
                attendeeId: z.coerce.number().int()
            }),
            response: {
                201: z.null()
            }
        }
    }, async (request, reply) => {

        const { attendeeId } = request.params

        const attendeeIsRegistered = await prisma.attendee.findUnique({
            where: {
                id:attendeeId
            }
        })

        if(!attendeeIsRegistered){
            throw new BadRequest('This user was not identified as an event registrant')
        }

        const attendeeChecking = await prisma.checkin.findUnique({
            where: {
                attendeeId
            }
        })

        if(attendeeChecking !== null){
            throw new BadRequest('Attendee already checked in')
        }

        
        await prisma.checkin.create({
            data: {
                attendeeId
            }
        })

        return reply.status(201).send()
        
    })
}