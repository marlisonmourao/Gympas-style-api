import { app } from '@/app'
import { createAndAuthenticaterUser } from '@/utils/test/create-and-authenticater-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticaterUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript gym',
        description: 'A gym for JavaScript developers',
        phone: '992434343',
        latitude: -3.0737507,
        longitude: -59.9219333,
      })

    expect(response.status).toEqual(201)
  })
})
