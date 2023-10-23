import { InMemoryCheckInsReposity } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymReposity } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUserCase } from './check-in'

let usersRepository: InMemoryCheckInsReposity
let gymsRepository: InMemoryGymReposity
let sut: CheckInUserCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryCheckInsReposity()
    gymsRepository = new InMemoryGymReposity()
    sut = new CheckInUserCase(usersRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.0737507,
      userLongitude: -59.9219333,
    })

    await expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 9, 0, 20, 8))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.0737507,
      userLongitude: -59.9219333,
    })

    // red, green, refactor

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -3.0737507,
        userLongitude: -59.9219333,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 9, 0, 20, 8))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.0737507,
      userLongitude: -59.9219333,
    })

    vi.setSystemTime(new Date(2023, 10, 0, 20, 8))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.0737507,
      userLongitude: -59.9219333,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
