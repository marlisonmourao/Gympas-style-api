import { registerUserCase } from '@/use-cases/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, password, email } = registerBodySchema.parse(request.body)

  try {
    await registerUserCase({
      name,
      password,
      email,
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
