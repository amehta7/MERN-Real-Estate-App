import express from 'express'
import {
  getListing,
  createListing,
  deleteListing,
  updateListing,
} from '../controllers/listing.js'
import verifyToken from '../middleware/verifyToken.js'

const router = express.Router()

router.get('/get/:id', getListing)
router.post('/create', verifyToken, createListing)
router.delete('/delete/:id', verifyToken, deleteListing)
router.post('/update/:id', verifyToken, updateListing)

export default router
