import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate/authenticate'

export function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const auhenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

  return auhenticateUseCase
}
