import fastify from 'fastify'
import { knex } from './database'
import crypto from 'node:crypto'
const app = fastify({ logger: true })

app.get('/', async (request, reply) => {
  const tables = await knex('sqlite_schema').select('*')
  return tables
})

app.get('/hello', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'transação de teste',
      amount: 1000,
    })
    .returning('*')
  const transations = await knex('transactions').select('*')
  return transations
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
