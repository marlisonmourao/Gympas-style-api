import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics/get-user-metrics'

export function makeGetUseMetricsUseCase() {
  const checkInsrepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(checkInsrepository)

  return useCase
}
