import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import {prisma} from '../lib/prisma';
import { BadRequest } from "./_errors/bad-request";


export async function registerForEvent(app: FastifyInstance){
    app
    // ZodTypeProvider is being used for request and reply schema definition 
    .withTypeProvider<ZodTypeProvider>()
    .post('/events/:eventId/attendees', {
        schema: {
            summary: 'Allows user registration to event',
            tags:['events'],
            body: z.object({
                name: z.string().min(4),
                email: z.string().email(),
            }),
            params: z.object({
                eventId: z.string().uuid()
            }),
            response: {
                201: z.object({
                    attendeeId: z.number()
                })
            }
        }}, async (request, reply) => {
        const { eventId } = request.params
        const {name, email} = request.body

        const attendeeFromEmail = await prisma.attendee.findUnique({
            where: {
                eventId_email: {
                    email,
                    eventId
                }
            }
        })

        if(attendeeFromEmail !== null){
            throw new BadRequest('This email is already registered for this event')
        }

        const [event, amountOfAttendeesForEvent] = await Promise.all([
            prisma.event.findUnique({
                where: {
                    id: eventId
                }
            }),
            prisma.attendee.count({
                where: {
                    eventId: eventId,
                }
            })
        ])

        if(!event){
            throw new BadRequest('The specified event was not found')
        }
    
       
        if(event?.maximumAttendees && amountOfAttendeesForEvent >= event.maximumAttendees){
            throw new BadRequest('This event is no longer avaiable for new registrations')
        }

        const attendee = await prisma.attendee.create({
            data: {
                name,
                email,
                eventId
            }
        })
        return reply.status(201).send({attendeeId: attendee.id})
    })
}