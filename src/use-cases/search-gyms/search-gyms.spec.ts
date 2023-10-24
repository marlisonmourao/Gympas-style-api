import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'
let gymsRepository: InMemoryGymRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Javascript gyms',
      description: 'teste',
      latitude: -3.0737507,
      longitude: -59.9219333,
      phone: null,
    })

    await gymsRepository.create({
      title: 'Typescript gyms',
      description: 'teste',
      latitude: -3.0737507,
      longitude: -59.9219333,
      phone: null,
    })

    const { gyms } = await sut.execute({
      query: 'Typescript gyms',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Typescript gyms' }),
    ])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript gyms ${i}`,
        description: 'teste',
        latitude: -3.0737507,
        longitude: -59.9219333,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript gyms 21' }),
      expect.objectContaining({ title: 'Javascript gyms 22' }),
    ])
  })
})
