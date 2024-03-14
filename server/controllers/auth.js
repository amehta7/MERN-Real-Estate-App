import User from '../models/User.js'
import bcryptjs from 'bcryptjs'

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body
  try {
    const hashedPwd = await bcryptjs.hashSync(password, 10)

    const newUser = await User.create({ username, email, password: hashedPwd })

    res.status(201).json('User created successfully!')
  } catch (error) {
    next(error)
  }
}
