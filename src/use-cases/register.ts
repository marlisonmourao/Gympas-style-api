import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUserCasesRequest {
  name: string
  email: string
  password: string
}

export async function registerUserCase({
  email,
  name,
  password,
}: RegisterUserCasesRequest) {
  const password_hash = await hash(password, 6)

  const userWithSamelEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSamelEmail) {
    throw new Error('E-mail already exists')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
