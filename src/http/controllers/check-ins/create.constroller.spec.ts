import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticaterUser } from '@/utils/test/create-and-authenticater-user'

import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticaterUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -3.0710728,
        longitude: -59.9274768,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -3.0711299,
        longitude: -59.9267017,
      })

    expect(response.statusCode).toEqual(201)
  })
})
