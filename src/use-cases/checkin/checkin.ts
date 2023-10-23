import { CheckInsRepository } from '@/repositories/check-ins.repository'
import { CheckIn } from '@prisma/client'

interface CheckInUserCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUserCase {
  constructor(private CheckInsRepository: CheckInsRepository) {}

  async execute({
    gymId,
    userId,
  }: CheckInUserCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.CheckInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
