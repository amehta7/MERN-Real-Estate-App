import Listing from '../models/Listing.js'
import { errorHandler } from '../utils/error.js'

export const createListing = async (req, res, next) => {
  try {
    const newListing = await Listing.create(req.body)
    return res.status(201).json(newListing)
  } catch (error) {
    next(error)
  }
}

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id)

    if (!listing) {
      return next(errorHandler(404, 'There is no listing with this id!'))
    }

    if (listing.userRef !== req.user.id) {
      return next(errorHandler(401, 'You can only delete your own listing!'))
    }

    await Listing.findByIdAndDelete(req.params.id)

    res.status(200).json('Listing has been deleted!')
  } catch (error) {
    next(error)
  }
}
