import fastify from 'fastify'
import cors from '@fastify/cors'
import 'dotenv/config'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify()

app.register(multipart)

app.register(require('@fastify/static'), {
    root: resolve(__dirname, '../uploads'),
    prefix: '/uploads'
})

app.register(cors, {
    origin: true, // todas as URLs de frontend poderão acessar nossas rotas backend
})

app.register(jwt, {
    secret: 'spacetime'
})

app.register(memoriesRoutes)
app.register(authRoutes)
app.register(uploadRoutes)

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
