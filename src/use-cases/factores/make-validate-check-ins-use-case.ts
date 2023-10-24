import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUserCase } from './../validate-check-in/validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInsrepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUserCase(checkInsrepository)

  return useCase
}
