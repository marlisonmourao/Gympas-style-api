import { LateCheckInValidateError } from '@/errors/late-check-in-validate-error'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { CheckInsRepository } from '@/repositories/check-ins.repository'
import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'

interface ValidateCheckInUserCaseRequest {
  checkInId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUserCase {
  constructor(private CheckInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUserCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.CheckInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidateError()
    }

    checkIn.validated_at = new Date()

    await this.CheckInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
