import { useState } from 'react'
import { Link } from 'react-router'
import './loginModal.css'
import useSessionStore from '../../stores/useSessionStore'

/**
 * LoginModal Component
 * Modal popup for user authentication with login and sign up options
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Callback to close the modal
 */
function LoginModal({ onClose }) {
  const setUser = useSessionStore((s) => s.setUser)

  // Local state holding all form field values
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  // Holds any validation or API error message
  const [error, setError] = useState(null)

  // Holds loading state during API call
  const [loading, setLoading] = useState(false)

  // Single handler for all inputs — uses the input's name attribute to update the correct key in formData
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Validates form data and returns an error message, or null if everything is ok
  function validateForm() {
    if (!formData.email || !formData.password) {
      return 'Alla fält måste fyllas i.'
    }
    if (formData.password.length < 6) {
      return 'Lösenordet måste vara minst 6 tecken.'
    }
    return null
  }

  // Handles form submission — validates input, calls Supabase login API,
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
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/token?grant_type=password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error_description || data.msg || 'Felaktiga inloggningsuppgifter.')
      }

      setUser(data.user)
      onClose()

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <h1>Login</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-post</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Din e-postadress"
              value={formData.email}
              onChange={handleChange}
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Lösenord</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ditt lösenord"
              maxLength={72}
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Loggar in...' : 'Logga in'}
          </button>
        </form>

        <p className="signup-link">Inget konto? <Link to="/signup" onClick={onClose}>Registrera dig</Link></p>
      </div>
    </div>
  );
}

export default LoginModal;