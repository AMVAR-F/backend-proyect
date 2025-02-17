import React from 'react'
import { Link } from 'react-router-dom'

import '../../css/code.css'

const EmailVerification = () => {
  return (
    <div className="code-body">
      <div className="verification-container">
        <h2>Email Verification</h2>
        <p>We have sent a code to your email </p>
        <div className="otp-inputs"></div>
        <Link to="/newpassword">
          {' '}
          <button className="verify-button">Verify Account</button>
        </Link>

        <p className="resend-text">
          Didn’t receive code? <span className="resend-link">Resend OTP</span>
        </p>
      </div>
    </div>
  )
}
export default EmailVerification
