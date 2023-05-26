import { _ } from './_util'

export const sum = async ({ a, b }) => {
  return { status: 201, data: { sum: a + b } }
}

export default _(['get', 'post'], sum)
