import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GymUseCase } from './create-gym'

let gymsRepository: InMemoryGymRepository
let sut: GymUseCase

describe('Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository()
    sut = new GymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Javascript Gym',
      description: 'teste',
      latitude: -3.0737507,
      longitude: -59.9219333,
      phone: null,
    })

    await expect(gym.id).toEqual(expect.any(String))
  })
})
