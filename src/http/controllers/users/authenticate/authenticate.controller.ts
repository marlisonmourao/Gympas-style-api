import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factores/make-authentica-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

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
    const authenticateUserCase = makeAuthenticateUseCase()

    const { user } = await authenticateUserCase.execute({
      password,
      email,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
