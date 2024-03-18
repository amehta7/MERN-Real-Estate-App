import { FaSearch } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Real</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center '>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />
          <FaSearch className='text-slate-600' />
        </form>
        <ul className='flex gap-5 font-bold text-slate-600'>
          <Link to='/'>
            <li className='hidden sm:inline hover:text-slate-900 hover:underline '>
              {' '}
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline hover:text-slate-900 hover:underline'>
              {' '}
              About
            </li>
          </Link>

          {currentUser ? (
            <Link to='/profile'>
              <img
                className='w-7 h-7 rounded-full object-cover'
                src='https://media.istockphoto.com/id/1314335932/vector/user-avatar-profile-icon-black-vector-illustration-website-or-app-member-ui-button.jpg?s=612x612&w=0&k=20&c=HPIFqbxMi_eQygr02gXt7SULaU1lhd25githq9GtqMg='
                alt='Profile Image'
              />
            </Link>
          ) : (
            <Link to='/sign-in'>
              <li className=' hover:text-slate-900 hover:underline'>
                {' '}
                Sign In
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  )
}

export default Header
