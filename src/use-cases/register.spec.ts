import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { InMemoryUserReposity } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUserCase } from './register'

let usersRepository: InMemoryUserReposity
let sut: RegisterUserCase

describe('Register Use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserReposity()
    sut = new RegisterUserCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '1234546',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '1234546',
    })

    const isPasswordCorrectlyHashed = await compare(
      '1234546',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@email.com'

    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '1234546',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '1234546',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
