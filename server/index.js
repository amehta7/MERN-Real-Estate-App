import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

dotenv.config()

const app = express()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error) => console.log(error))

app.listen(3000, () => {
  console.log('Server is running on port 3000!')
})
