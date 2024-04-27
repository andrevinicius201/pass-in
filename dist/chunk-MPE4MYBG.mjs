import {
  generateSlug
} from "./chunk-D522ZAIR.mjs";
import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/create-event.ts
import { z } from "zod";
async function createEvent(app) {
  app.withTypeProvider().post("/events", {
    schema: {
      summary: "Create event",
      tags: ["events"],
      body: z.object({
        title: z.string({ invalid_type_error: "Title must be a string containing at least 4 characters" }).min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().nullable()
      }),
      response: {
        201: z.object({
          eventId: z.string().min(4)
        })
      }
    }
  }, async (request, reply) => {
    const {
      title,
      details,
      maximumAttendees
    } = request.body;
    const slug = generateSlug(title);
    const eventWithSameSlug = await prisma.event.findUnique({
      where: {
        slug
      }
    });
    if (eventWithSameSlug != null) {
      throw new BadRequest("Another event with same title already exists");
    }
    const event = await prisma.event.create({
      data: {
        title,
        details,
        maximumAttendees,
        slug
      }
    });
    return reply.status(201).send({ eventId: event.id });
  });
}

export {
  createEvent
};
