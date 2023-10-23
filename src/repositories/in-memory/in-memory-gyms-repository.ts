import { Gym } from '@prisma/client'
import { GymsRepository } from '../gym.repository'

export class InMemoryGymReposity implements GymsRepository {
  public items: Gym[] = []

  async findById(gymId: string) {
    const gym = this.items.find((item) => item.id === gymId)

    if (!gym) {
      return null
    }

    return gym
  }
}
