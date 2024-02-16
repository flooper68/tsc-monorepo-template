import { UserData } from '@showcase/server-feature'
import { describe, expect, it } from 'vitest'

import { getTestContext } from './context/get-test-context'

describe('getUserList', () => {
  it("smokes'", async () => {
    const { feature } = getTestContext()

    const result = await feature.getUserList()

    const testedUser = result.find(user => user.uuid === UserData.Alice.uuid)

    expect(testedUser).toBeDefined()
  })
})
