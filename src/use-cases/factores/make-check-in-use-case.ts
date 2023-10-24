import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUserCase } from '../check-in/check-in'

export function makeCheckInUseCase() {
  const checkInsrepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new CheckInUserCase(checkInsrepository, gymsRepository)

  return useCase
}
