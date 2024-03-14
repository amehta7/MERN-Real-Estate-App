import express from 'express'
import { signin } from '../controllers/user.js'

const router = express.Router()

router.get('/signin', (req, res) => {
  res.send('Sign-in route')
})

router.get('/signout', signin)

export default router
