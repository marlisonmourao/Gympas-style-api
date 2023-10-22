import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { InMemoryUserReposity } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { RegisterUserCase } from './register'

describe('Register Use case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUserReposity()
    const registerUserCase = new RegisterUserCase(usersRepository)

    const { user } = await registerUserCase.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '1234546',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUserReposity()
    const registerUserCase = new RegisterUserCase(usersRepository)

    const { user } = await registerUserCase.execute({
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
    const usersRepository = new InMemoryUserReposity()
    const registerUserCase = new RegisterUserCase(usersRepository)

    const email = 'johndoe@email.com'

    await registerUserCase.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '1234546',
    })

    await expect(() =>
      registerUserCase.execute({
        name: 'John Doe',
        email,
        password: '1234546',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
