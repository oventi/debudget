import { _ } from '../../lib/api'
import { kv } from '@vercel/kv'

export const user = async (new_data, { username }) => {
  const user = await kv.hgetall(username)
  if (!user) {
    return { status: 404, data: null } // http_status_code
  }

  await kv.hset(username, { ...user, ...new_data })

  return new_data
}

export default _('patch', user)
