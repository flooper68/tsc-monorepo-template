import { type ReactNode } from 'react'

import './App.css'
import { TrpcProvider, trpc } from './trpc-provider'

function Content(): JSX.Element {
  const { data } = trpc.userList.useQuery()

  return (
    <div>
      <h1>Vite + React</h1>
      <div className="card">
        <h2>Users</h2>
        {data?.map(user => <div key={user.uuid}>{user.name}</div>)}
      </div>
    </div>
  )
}

export function App(): ReactNode {
  return (
    <TrpcProvider>
      <Content />
    </TrpcProvider>
  )
}
