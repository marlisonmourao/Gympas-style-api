import { InMemoryCheckInsReposity } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkIsRepository: InMemoryCheckInsReposity
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch Check-in History Use Case', () => {
  beforeEach(async () => {
    checkIsRepository = new InMemoryCheckInsReposity()
    sut = new FetchUserCheckInsHistoryUseCase(checkIsRepository)
  })

  it('should be able to fetch check in history', async () => {
    await checkIsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkIsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIn).toHaveLength(2)
    expect(checkIn).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('should be able to fetch paginated check in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkIsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIn).toHaveLength(2)
    expect(checkIn).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
