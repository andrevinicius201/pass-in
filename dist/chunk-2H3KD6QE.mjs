import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/checkin.ts
import z from "zod";
async function checkin(app) {
  app.withTypeProvider().get("/attendees/:attendeeId/check-in", {
    schema: {
      summary: "Check-in attendee",
      tags: ["attendees"],
      params: z.object({
        attendeeId: z.coerce.number().int()
      }),
      response: {
        201: z.null()
      }
    }
  }, async (request, reply) => {
    const { attendeeId } = request.params;
    const attendeeIsRegistered = await prisma.attendee.findUnique({
      where: {
        id: attendeeId
      }
    });
    if (!attendeeIsRegistered) {
      throw new BadRequest("This user was not identified as an event registrant");
    }
    const attendeeChecking = await prisma.checkin.findUnique({
      where: {
        attendeeId
      }
    });
    if (attendeeChecking !== null) {
      throw new BadRequest("Attendee already checked in");
    }
    await prisma.checkin.create({
      data: {
        attendeeId
      }
    });
    return reply.status(201).send();
  });
}

export {
  checkin
};
