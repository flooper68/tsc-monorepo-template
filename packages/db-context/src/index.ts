import Pg from 'pg'

const { Pool } = Pg

export interface DbContextConfig {
  connectionString: string
  maxConnections: number
}

export class DbContext {
  private readonly _pool: Pg.Pool

  constructor(config: DbContextConfig) {
    this._pool = new Pool({
      connectionString: config.connectionString,
      max: config.maxConnections,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    })
  }

  async withConnection<T>(fn: (client: Pg.PoolClient) => Promise<T>) {
    const client = await this._pool.connect()

    try {
      return await fn(client)
    } finally {
      client.release()
    }
  }

  async withTransaction<T>(fn: (client: Pg.PoolClient) => Promise<T>) {
    return await this.withConnection(async client => {
      await client.query('BEGIN')

      try {
        const result = await fn(client)

        await client.query('COMMIT')

        return result
      } catch (e) {
        await client.query('ROLLBACK')
        throw e
      }
    })
  }

  async close() {
    await this._pool.end()
  }
}
