import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from '../features/user/userSlice'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({})
  const [successMsg, setSuccessMsg] = useState(false)
  const [showListingError, setShowListingError] = useState(false)
  const [listingData, setListingData] = useState([])
  const [deleteListingError, setDeleteListingError] = useState(false)

  const dispatch = useDispatch()

  //console.log(formData)

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      }
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      //console.log(data)
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }

      dispatch(updateUserSuccess(data))
      setSuccessMsg(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const deleteHandler = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      })

      const data = await res.json()
      //console.log(data)
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }

      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const signOutHandler = async () => {
    try {
      dispatch(signOutStart())
      const res = await fetch('/api/auth/signout')
      const data = await res.json()
      if (data.success === false) {
        dispatch(signOutFailure(data.message))
        return
      }

      dispatch(signOutSuccess(data))
    } catch (error) {
      dispatch(signOutFailure(error.message))
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingError(false)

      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      const data = await res.json()

      if (data.success === false) {
        setShowListingError(true)
        return
      }

      setListingData(data)
    } catch (error) {
      setShowListingError(true)
    }
  }

  const deleteListingHandler = async (listingId) => {
    try {
      setDeleteListingError(false)
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      })
      const data = await res.json()

      if (data.success === false) {
        setDeleteListingError(true)
        return
      }

      setListingData((prevListingData) =>
        prevListingData.filter((listing) => listing._id !== listingId)
      )
    } catch (error) {
      setDeleteListingError(true)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={submitHandler} className='flex flex-col gap-4'>
        <img
          className='w-24 h-24 rounded-full object-cover cursor-pointer self-center mt-2'
          src='https://media.istockphoto.com/id/1314335932/vector/user-avatar-profile-icon-black-vector-illustration-website-or-app-member-ui-button.jpg?s=612x612&w=0&k=20&c=HPIFqbxMi_eQygr02gXt7SULaU1lhd25githq9GtqMg='
          alt='Profile Image'
        />

        <input
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          id='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <button
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link
          to='/create-listing'
          className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-90 '
        >
          create listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={deleteHandler}>
          Delete Account
        </span>
        <span className='text-red-700 cursor-pointer' onClick={signOutHandler}>
          Sign Out
        </span>
      </div>
      {successMsg && (
        <p className='text-green-700 text-center mt-3'>
          User is updated successfully!
        </p>
      )}
      {error && <p className='text-red-500 mt-3'>{error}</p>}

      <button className='text-green-700 w-full' onClick={handleShowListings}>
        Show Listings
      </button>

      {showListingError && (
        <p className='text-red-500 mt-3'>Error in showing listings...</p>
      )}

      {listingData && listingData.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          {listingData.map((l) => (
            <div
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
              key={l._id}
            >
              <Link to={`/listing/${l._id}`}>
                <img
                  src={l.imageUrls[0]}
                  alt='Listing Image'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                to={`/listing/${l._id}`}
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
              >
                <p>{l.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button
                  className='text-red-700 uppercase'
                  onClick={() => deleteListingHandler(l._id)}
                >
                  Delete
                </button>
                <Link to={`/update-listing/${l._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      {deleteListingError && (
        <p className='text-red-500 mt-3 text-center'>
          Error in deleting listing...
        </p>
      )}
    </div>
  )
}

export default Profile
