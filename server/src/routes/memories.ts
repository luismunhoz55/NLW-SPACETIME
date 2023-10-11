import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {

  app.get('/test', async (request, reply) => {
    return 'Olá'
  })

  app.get('/memories', async (request, reply) => {
    const memories = await prisma.memory.findMany({
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
        userId: 'c387ce71-b128-4f11-bc35-4ce672625626',
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

    const memory = await prisma.memory.update({
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

    await prisma.memory.delete({
      where: {
        id
      }
    })
  })

}