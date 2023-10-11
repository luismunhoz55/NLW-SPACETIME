import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {

  //Vefiricar para todas as rotas, se o usuário está logado
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/memories', async (request, reply) => {

    const memories = await prisma.memory.findMany({
      where: {
        userId: request.user.sub,
      },
      orderBy: {
        createdAt: 'asc',
      }
    });

    return memories.map(memory => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...')
      }
    })
  })

  app.get('/memories/:id', async (request, reply) => {

    const memoryParamsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = memoryParamsSchema.parse(request.params);

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id
      }
    })

    if (!memory.isPublic && memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    return memory

  })

  app.post('/memories', async (request, reply) => {

    const createMemoryBody = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false)
    })

    const { content, coverUrl, isPublic } = createMemoryBody.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: request.user.sub,
      }
    })

    return memory ? memory : "Error"

  })

  app.put('/memories/:id', async (request, reply) => {

    const memoryParamsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = memoryParamsSchema.parse(request.params);

    const createMemoryBody = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false)
    })

    const { content, coverUrl, isPublic } = createMemoryBody.parse(request.body)

    let memory = await prisma.memory.findUnique({
      where: {
        id
      }
    })

    if (memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic
      }
    })

    return memory ? memory : "Error"
  })

  app.delete('/memories/:id', async (request, reply) => {

    const memoryParamsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = memoryParamsSchema.parse(request.params);

    let memory = await prisma.memory.findUnique({
      where: {
        id
      }
    })

    if (memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    await prisma.memory.delete({
      where: {
        id
      }
    })
  })

}