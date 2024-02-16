import { UserData } from '@showcase/server-feature'
import { describe, expect, it } from 'vitest'

import { getTestContext } from './context/get-test-context'

describe('getUserList', () => {
  it("smokes'", async () => {
    const { client } = getTestContext()

    const users = await client.userList.query()

    const testedUser = users.find(user => user.uuid === UserData.Alice.uuid)

    expect(testedUser).toBeDefined()
  })
})
