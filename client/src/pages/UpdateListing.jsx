import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateListing = () => {
  const { currentUser } = useSelector((state) => state.user)
  const { listingId } = useParams()

  // const [files, setFiles] = useState(Img)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    regularPrice: 50,
    discountPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    type: 'rent',
    offer: false,
    imageUrls: [],
  })
  const [showImgs, setShowImgs] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  //console.log(files)
  //console.log(formData)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchListing = async () => {
      const res = await fetch(`/api/listing/get/${listingId}`)
      const data = await res.json()
      //console.log(data)

      if (data.success === false) {
        setError(data.message)
        return
      }

      setFormData(data)
    }

    fetchListing()
  }, [listingId])

  const handleImage = () => {
    setShowImgs(!showImgs)
  }

  const deleteImgHandler = (index) => {
    setFormData((prev) => {
      return {
        ...prev,
        imageUrls: formData.imageUrls.filter(
          (_, imgIndex) => imgIndex !== index
        ),
      }
    })
  }

  const handleChange = (e) => {
    if (e.target.id === 'sell' || e.target.id === 'rent') {
      setFormData((prev) => {
        return {
          ...prev,
          type: e.target.id,
        }
      })
    }

    if (
      e.target.id === 'furnished' ||
      e.target.id === 'parking' ||
      e.target.id === 'offer'
    ) {
      setFormData((prev) => {
        return {
          ...prev,
          [e.target.id]: e.target.checked,
        }
      })
    }

    if (e.target.type === 'text' || e.target.type === 'textarea') {
      setFormData((prev) => {
        return {
          ...prev,
          [e.target.id]: e.target.value,
        }
      })
    }

    if (e.target.type === 'number') {
      setFormData((prev) => {
        return {
          ...prev,
          [e.target.id]: parseInt(e.target.value),
        }
      })
    }
  }

  //console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (formData.imageUrls.length < 1) {
        setError('You must upload at least one image')
        return
      }

      if (+formData.regularPrice < +formData.discountPrice) {
        setError('Discount price must be lower than regular price')
        return
      }

      setLoading(true)
      setError(null)

      const res = await fetch(`/api/listing/update/${listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      })
      //console.log({ ...formData, userRef: currentUser._id })
      const data = await res.json()

      if (data.success === false) {
        setError(data.message)
      }

      setLoading(false)
      navigate(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Update a Listing
      </h1>
      <form className='flex flex-col sm:flex-row gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength={62}
            minLength={10}
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                className='w-5'
                id='sell'
                onChange={handleChange}
                checked={formData.type === 'sell'}
              />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                className='w-5'
                id='rent'
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                className='w-5'
                id='parking'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking Spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                className='w-5'
                id='furnished'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                className='w-5'
                id='offer'
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                className='p-3 border border-gray-300 rounded-lg'
                id='bedrooms'
                min={1}
                max={10}
                required
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                className='p-3 border border-gray-300 rounded-lg'
                id='bathrooms'
                min={1}
                max={10}
                required
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                className='p-3 border border-gray-300 rounded-lg'
                id='regularPrice'
                min={50}
                max={10000000}
                required
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Regular Price</p>
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  className='p-3 border border-gray-300 rounded-lg'
                  id='discountPrice'
                  min={0}
                  max={10000000}
                  required
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted Price</p>
                  <span className='text-xs'>($ / month)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex  gap-4'>
            <input
              // onChange={(e) => setFiles(e.target.files)}
              className='p-3 border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
              onClick={handleImage}
            >
              Upload
            </button>
          </div>
          {showImgs &&
            formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={index}
                className='flex justify-between items-center p-3 border'
              >
                <img
                  src={url}
                  alt='Listing Image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  className='text-red-700 text-sm p-3 rounded-lg uppercase hover:opacity-75'
                  onClick={() => deleteImgHandler(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  )
}

export default UpdateListing
