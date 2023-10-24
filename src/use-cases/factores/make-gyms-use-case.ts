import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { GymUseCase } from '../gym/create-gym'

export function makeGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new GymUseCase(gymsRepository)

  return useCase
}
