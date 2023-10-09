import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const app = fastify()
const prisma = new PrismaClient()

app.get('/test', async (request, reply) => {
    return 'Olá'
})

app
    .listen({
        port: 3333,
    })
    .then(() => {
        console.log('Server rodando em http://localhost:3333 🐲')
    })
