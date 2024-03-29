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

export const searchListing = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9
    const startIndex = parseInt(req.query.startIndex) || 0

    //offer
    let offer = req.query.offer
    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] } //search for offer - true or false both as offer is not specified
    }

    //furnished
    let furnished = req.query.furnished
    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] }
    }

    //parking
    let parking = req.query.parking
    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] }
    }

    //type
    let type = req.query.type
    if (type === undefined || type === 'all') {
      type = { $in: ['sell', 'rent'] }
    }

    //searchTerm - like search with name
    const searchTerm = req.query.searchTerm || ''

    //sort
    const sort = req.query.sort || 'createdAt'

    //order
    const order = req.query.order || 'desc'

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex)

    //console.log(listings)
    res.status(200).json(listings)
  } catch (error) {
    next(error)
  }
}
