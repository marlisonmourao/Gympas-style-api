import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history.ts/fetch-user-check-ins-history'

export function makeFetchUserCheckInHistoryUseCase() {
  const checkInsrepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsrepository)

  return useCase
}
