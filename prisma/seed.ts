import { prisma } from '../src/lib/prisma'

async function seed(){
    await prisma.event.create({
        data: {
            id: 'de152b3a-cffa-48be-83c7-1d84bffddf8a',
            title: 'Churrasquinho da vizinhança',
            slug: 'churrasquinho-da-vizinha',
            details: 'Um churrasco para a rapaziada',
            maximumAttendees: 4,
        }
    })
}

seed().then(() => {
    console.log('Database seeded!')
    prisma.$disconnect()
})