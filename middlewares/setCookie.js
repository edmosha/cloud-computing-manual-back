import { readFileSync } from 'fs'
import { ACCESS_TOKEN_SECRET, COOKIE_NAME } from '../config/index.js'
import { signToken } from '../utils/token.js'

const PRIVATE_KEY = readFileSync('./config/private_key.pem', 'utf8')

export const setCookie = async (req, res, next) => {
  const user = req.user

  console.log(user)

  if (!user) {
    return res.status(400).json({ message: 'User must be provided' })
  }

  try {
    const accessToken = await signToken(
      { userId: user.userId, role: user.role },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: '24h'
      }
    )

    let refreshToken
    if (!req.cookies[COOKIE_NAME]) {
      refreshToken = await signToken({ userId: user.userId }, PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: '7d'
      })

      res.cookie(COOKIE_NAME, refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      })
    }

    const payload = req.payload

    console.log('payload', payload)

    if (payload) {
      res.status(200).json(payload)
    } else {
      res.status(200).json({ user, accessToken })
    }
  } catch (e) {
    console.log('*setCookie middleware')
    next(e)
  }
}
