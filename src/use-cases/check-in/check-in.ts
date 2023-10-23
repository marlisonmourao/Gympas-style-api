import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { CheckInsRepository } from '@/repositories/check-ins.repository'
import { GymsRepository } from '@/repositories/gym.repository'
import { CheckIn } from '@prisma/client'

interface CheckInUserCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUserCase {
  constructor(
    private CheckInsRepository: CheckInsRepository,
    private GymsRepository: GymsRepository,
  ) {}

  async execute({
    gymId,
    userId,
  }: CheckInUserCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.GymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // calculate distance between gym and user

    const checkInOnSomeDay = await this.CheckInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSomeDay) {
      throw new Error()
    }

    const checkIn = await this.CheckInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
