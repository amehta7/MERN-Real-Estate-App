import { useSelector } from 'react-redux'

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img
          className='w-24 h-24 rounded-full object-cover cursor-pointer self-center mt-2'
          src='https://media.istockphoto.com/id/1314335932/vector/user-avatar-profile-icon-black-vector-illustration-website-or-app-member-ui-button.jpg?s=612x612&w=0&k=20&c=HPIFqbxMi_eQygr02gXt7SULaU1lhd25githq9GtqMg='
          alt='Profile Image'
        />

        <input
          type='text'
          id='username'
          placeholder='username'
          className='border p-3 rounded-lg'
        />
        <input
          type='email'
          id='email'
          placeholder='email'
          className='border p-3 rounded-lg'
        />
        <input
          type='password'
          id='password'
          placeholder='password'
          className='border p-3 rounded-lg'
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>
          update
        </button>
        <button className='bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>
          create listing
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile
