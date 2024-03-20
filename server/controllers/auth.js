import User from '../models/User.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return next(errorHandler(404, 'User not found with this email!'))
    }

    const validPwd = bcryptjs.compareSync(password, user.password)

    if (!validPwd) {
      return next(errorHandler(401, 'Wrong Credentials!'))
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    const { password: pass, ...otherInfo } = user._doc

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(otherInfo)
  } catch (error) {
    next(error)
  }
}

export const signout = async (req, res, next) => {
  try {
    res.clearCookie('access_token')
    res.status(200).json('User has been logged out!')
  } catch (error) {
    next(error)
  }
}
