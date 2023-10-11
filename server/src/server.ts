import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'

const app = fastify()

app.register(cors, {
    origin: true, // todas as URLs de frontend poderão acessar nossas rotas backend
})
app.register(memoriesRoutes)

app
    .listen({
        port: 3333,
    })
    .then(() => {
        console.log('Server rodando em http://localhost:3333 🐲')
    })
