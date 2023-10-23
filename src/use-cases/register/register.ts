import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUserCasesRequest {
  name: string
  email: string
  password: string
}

interface registerUserCaseResponse {
  user: User
}

export class RegisterUserCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUserCasesRequest): Promise<registerUserCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSamelEmail = await this.usersRepository.findByEmail(email)

    if (userWithSamelEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
