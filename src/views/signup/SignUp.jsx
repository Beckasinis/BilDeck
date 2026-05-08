import { useState } from 'react'
import useModalStore from '../../stores/useModalStore'
import { useNavigate } from 'react-router'
import './signup.css'

function SignUpView() {
  const navigate = useNavigate()

  // Local state holding all form field values
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  // Holds loading state during API call
  const [loading, setLoading] = useState(false)

  //Holds any validation or API error message
  const [error, setError] = useState(null)

  //Open login modal from global store
  const openLoginModal = useModalStore((s) => s.openLoginModal)

  // Single handler for all inputs — uses the input's name attribute to update the correct key in formData
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function validateForm() {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      return 'Alla fält måste fyllas i.'
    }
    if (formData.password.length < 6) {
      return 'Lösenordet måste vara minst 6 tecken långt.'
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Lösenorden matchar inte.'
    }
    return null
  }

  // Handles form submission — validates input, calls Supabase signup API,
  // displays error message if something goes wrong
  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.msg || data.error_description || 'Något gick fel.')
      }

      navigate('/')

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-view">
      <div className="signup-card">
        <h1>Sign Up</h1>

        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>E-post</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-post"
            />
          </div>

          <div className="form-group">
            <label>Lösenord</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Lösenord"
            />
          </div>

          <div className="form-group">
            <label>Bekräfta lösenord</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Bekräfta lösenord"
            />
          </div>

          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? 'Skapar konto...' : 'Registrera konto'}
          </button>
        </form>
        <p className="login-link">
          Har du redan ett konto? <a onClick={openLoginModal}>Logga in</a>
        </p>
      </div>
    </div>
  )
}

export default SignUpView