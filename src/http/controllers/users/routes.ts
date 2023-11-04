import { verifyJWT } from '@/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate/authenticate.controller'
import { profile } from './profile/profile.controller'
import { refresh } from './refresh/refresh.controller'
import { register } from './register/register.controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
