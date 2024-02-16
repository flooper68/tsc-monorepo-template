import { describe, expect, it } from 'vitest'

import { getTestContext } from './context/get-test-context'

describe('createUser', () => {
  it("smokes'", async () => {
    const { feature } = getTestContext()

    const uuid = 'b549e822-d0d0-4baf-bd02-0d3635f7ca6f'

    await feature.createUser({
      uuid,
      name: 'Pepa Novak'
    })

    const users = await feature.getUserList()

    const testedUser = users.find(user => user.uuid === uuid)

    expect(testedUser).toBeDefined()
  })
})
