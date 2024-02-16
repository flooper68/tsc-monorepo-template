export interface User {
  uuid: string
  name: string
}

interface AuthSession {
  email: string
}

export interface TrpcContext {
  getSession: () => AuthSession | null
  feature: {
    getUserList: () => Promise<User[]>
  }
}
