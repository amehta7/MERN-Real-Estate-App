import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from '../features/user/userSlice'

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({})
  const [successMsg, setSuccessMsg] = useState(false)

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
        <button className='bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>
          create listing
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={deleteHandler}>
          Delete Account
        </span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      {successMsg && (
        <p className='text-green-700 text-center mt-3'>
          User is updated successfully!
        </p>
      )}
      {error && <p className='text-red-500 mt-3'>{error}</p>}
    </div>
  )
}

export default Profile
