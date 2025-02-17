import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/login.css'

const ForgotPassword = () => {
  return (
    <div className="login-body">
      <div className="login-wrapper">
        <h1>Forgot Password</h1>
        <p>Please enter your email to reset your password.</p>
        <form>
          <div className="input-box">
            <input type="email" placeholder="Enter your email" />
          </div>
          <Link to="/code">
            <button type="submit">Reset Password</button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
