interface UserRecord {
  uuid: string
  name: string
}

export const UserData = {
  Alice: {
    uuid: '28baf6fa-e2c6-41a4-b83a-63bed32b8222',
    name: 'Alice'
  },
  Bob: {
    uuid: '4712e1f9-ff97-4cc9-8c0a-f173488f8bfc',
    name: 'Bob'
  }
} as const satisfies Record<string, UserRecord>
