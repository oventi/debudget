import shajs from 'sha.js'
import { _ } from '../lib/api'
import { kv } from '@vercel/kv'
import jwt from 'jsonwebtoken'

const sha256 = message => shajs('sha256').update(message).digest('hex')

const create_user = async (username, password) => {
  const user = {
    username,
    password: sha256(password),
    pay_amount: 0,
    plan: null
  }

  await kv.hset(username, user)

  return user
}

export const login_or_register = async ({ username, password }) => {
  let user = await kv.hgetall(username)
  if (!user) {
    user = await create_user(username, password)
  } else if (user && sha256(password) !== user.password) {
    return { status: 401, data: null } // http_status_code
  }

  const { pay_amount, plan } = user
  return {
    access_token: jwt.sign({ username }, process.env.JWT_SECRET),
    user: { username, pay_amount, plan }
  }
}

export default _('post', login_or_register)
