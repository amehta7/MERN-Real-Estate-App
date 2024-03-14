import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [isLoading, setIsLoaing] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  //console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoaing(true)
      setError(null)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      //console.log(data)
      if (data.success === false) {
        setError(data.message)
        setIsLoaing(false)
        return
      }
      setIsLoaing(false)
      setError(null)
      navigate('/sign-in')
    } catch (error) {
      setError(error.message)
      setIsLoaing(false)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold text-slate-700 my-7'>
        Sign Up
      </h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
          required
        />
        <input
          type='email'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
          required
        />
        <input
          type='password'
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
          required
        />
        <button
          disabled={isLoading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'
        >
          {isLoading ? 'Loading...' : 'Sign up'}
        </button>
      </form>
      {error && <p className='text-red-500 mt-3'>{error}</p>}
      <div className='flex flex-row gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-800'>Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
