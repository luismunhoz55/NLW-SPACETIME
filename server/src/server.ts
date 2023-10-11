import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'
import 'dotenv/config'
import { authRoutes } from './routes/auth'
import jwt from '@fastify/jwt'

const app = fastify()

app.register(cors, {
    origin: true, // todas as URLs de frontend poderão acessar nossas rotas backend
})
app.register(memoriesRoutes)
app.register(authRoutes)
app.register(jwt, {
    secret: 'spacetime'
})

// Teste
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
