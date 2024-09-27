import { knex as setupKnex, Knex } from 'knex'
if (!process.env.DATABASE_URL) {
  throw new Error('ENVORIMENT VARIABLE DATABASE_URL IS NOT DEFINED')
}
export const config: Knex.Config = {
  client: 'sqlite',
  connection: { filename: './tmp/app.db' },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: process.env.DATABASE_URL,
  },
}
export const knex = setupKnex(config)
