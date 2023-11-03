import { verifyJWT } from '@/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

export async function gymsRouter(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
}
