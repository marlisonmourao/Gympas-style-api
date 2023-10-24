import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { GetUserMetricsUseCase } from './get-user-metrics'

let checkIsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get user metrics Use Case', () => {
  beforeEach(async () => {
    checkIsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkIsRepository)
  })

  it('should be able to get user check-ins count from metrics', async () => {
    await checkIsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkIsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
