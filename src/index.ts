import fastify from 'fastify'
import { knex } from './database'

const app = fastify({ logger: true })

app.get('/', async (request, reply) => {
  const tables = await knex('sqlite_schema').select('*')
  return tables
})
const start = async () => {
  try {
    await app.listen({ port: 3000 })
    console.log('Servidor rodando na porta 3000')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
