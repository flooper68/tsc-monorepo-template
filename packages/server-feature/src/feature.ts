import { DbContext } from '@showcase/db-context'

export interface ServerFeatureConfig {
  connectionString: string
}

export interface UserRecord {
  uuid: string
  name: string
}

export interface CreateUserProps {
  uuid: string
  name: string
}

export class ServerFeature {
  private readonly _dbContext: DbContext

  constructor(private readonly _config: ServerFeatureConfig) {
    this._dbContext = new DbContext({
      connectionString: this._config.connectionString,
      maxConnections: 20
    })
  }

  async getUserList(): Promise<UserRecord[]> {
    return await this._dbContext.withConnection(async client => {
      const result = await client.query<UserRecord>('SELECT * FROM users')
      return result.rows
    })
  }

  async createUser(props: CreateUserProps): Promise<void> {
    await this._dbContext.withConnection(async client => {
      const result = await client.query<UserRecord>('INSERT INTO users (uuid, name) VALUES ($1, $2) RETURNING *', [
        props.uuid,
        props.name
      ])

      const [user] = result.rows

      if (user == null) {
        throw new Error('Failed to create user!')
      }
    })
  }

  async close() {
    await this._dbContext.close()
  }
}
