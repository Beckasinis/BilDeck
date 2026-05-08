import { useState } from 'react'
import './signup.css'

function SignUpView() {
  // Local state holding all form field values
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState(null)

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

  // Prevents default form reload and logs current form data
  function handleSubmit(e) {
    e.preventDefault()
    setError(null) // Clear previous errors

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }
    console.log('Formulärdata:', formData)
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

          <button className="submit-button" type="submit">
            Registrera konto
          </button>
        </form>
        <p className="login-link">
          Har du redan ett konto? <a>Logga in</a>
        </p>
      </div>
    </div >
  )
}

export default SignUpView