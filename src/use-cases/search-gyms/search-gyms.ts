import { GymsRepository } from '@/repositories/gym.repository'
import { Gym } from '@prisma/client'

interface SourchGymUseCaseRequest {
  query: string
  page: number
}

interface SourchGymUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SourchGymUseCaseRequest): Promise<SourchGymUseCaseResponse> {
    const gyms = await this.gymRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
