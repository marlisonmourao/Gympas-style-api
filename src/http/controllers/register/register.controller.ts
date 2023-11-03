import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factores/make-register-use-caset'
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
    const registerUserCase = makeRegisterUseCase()

    await registerUserCase.execute({
      name,
      password,
      email,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
