import { verifyJWT } from '@/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate/authenticate.controller'
import { profile } from './controllers/profile'
import { register } from './controllers/register/register.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
