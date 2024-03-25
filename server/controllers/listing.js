import Listing from '../models/Listing.js'
import { errorHandler } from '../utils/error.js'

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id)

    if (!listing) {
      return next(errorHandler(404, 'There is no listing with this id!'))
    }

    res.status(201).json(listing)
  } catch (error) {
    next(error)
  }
}

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

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id)

    if (!listing) {
      return next(errorHandler(404, 'There is no listing with this id!'))
    }

    if (listing.userRef !== req.user.id) {
      return next(errorHandler(401, 'You can only update your own listing!'))
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.status(200).json(updatedListing)
  } catch (error) {
    next(error)
  }
}
