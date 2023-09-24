import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify()
export const prisma = new PrismaClient()
prisma.user.create({
  data: {
    name: 'Marlison Bentes Mourão',
    email: 'bentesmourao@gmail.com',
  },
})
