import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
import listingRouter from './routes/listing.js'
import { errorMiddleware } from './middleware/error.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error) => console.log(error))

app.get('/', (req, res) => {
  res.send('Welcome to server app')
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)

app.use(errorMiddleware)

app.listen(3000, () => {
  console.log('Server is running on port 3000!')
})
