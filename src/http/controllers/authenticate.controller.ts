import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticaBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { password, email } = authenticaBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateUserCase = new AuthenticateUseCase(prismaUsersRepository)

    await authenticateUserCase.execute({
      password,
      email,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }

  return reply.status(200).send()
}
