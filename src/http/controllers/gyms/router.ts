import { verifyJWT } from '@/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { nearby } from './nearby.controller'
import { search } from './search.controller'

export async function gymsRouter(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/search', nearby)

  app.post('/gyms', create)
}
