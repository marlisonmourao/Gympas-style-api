import { makeGetUseMetricsUseCase } from '@/use-cases/factores/make-get-use-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMatricsUserCase = makeGetUseMetricsUseCase()

  const { checkInsCount } = await getUserMatricsUserCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkInsCount })
}
