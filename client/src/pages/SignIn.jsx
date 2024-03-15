import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoaing] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.id]: e.target.value }
    })
  }

  //console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoaing(true)
      setError(null)
      const res = await fetch('/api/auth/signin', {
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
      navigate('/')
    } catch (error) {
      setError(error.message)
      setIsLoaing(false)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold text-slate-700 my-7'>
        Sign In
      </h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
          {isLoading ? 'Loading...' : 'Sign In'}
        </button>
      </form>

      <div className='flex flex-row gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-800'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-3'>{error}</p>}
    </div>
  )
}

export default SignIn
