import { makeFetchUserCheckInHistoryUseCase } from '@/use-cases/factores/make-fetch-user-check-ins-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const searchGymsUseCase = makeFetchUserCheckInHistoryUseCase()

  const { checkIn } = await searchGymsUseCase.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkIn })
}
