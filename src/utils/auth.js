import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token => {
  console.log({ config })
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
}

export const signup = async (req, res) => {
  try {
    const doc = await User.create(req.body)
    if (!doc) {
      return res.status(400).send({ message: 'Bad Request' })
    }
    const token = newToken(doc)
    return res.status(201).send({ token })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ message: 'Bad Request' })
  }
}

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Email and password required' })
  }
  const { email, password } = req.body
  const user = await User.findOne({ email }).exec()
  if (!user) {
    return res.status(401).send({ message: 'Bad Request' })
  }
  try {
    const match = await user.checkPassword(password)
    if (!match) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (error) {
    console.error(error)
    return res.status(401).send({ message: 'Unauthorized' })
  }
}

export const protect = async (req, res, next) => {
  let token = req.headers.authorization.split('Bearer ')[1]

  if (!token) {
    res.status(401).end()
  }
  try {
    const payload = await verifyToken(token)
    const user = await User.findById(payload.id)
      .select('-password')
      .exec()
    if (!user) {
      res.status(401).end()
    }
    req.user = user
    next()
  } catch (error) {
    console.error(error)
    return res.status(401).end()
  }
}
