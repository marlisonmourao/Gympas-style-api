import { makeValidateCheckInUseCase } from '@/use-cases/factores/make-validate-check-ins-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const checkInUseCase = makeValidateCheckInUseCase()

  await checkInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
