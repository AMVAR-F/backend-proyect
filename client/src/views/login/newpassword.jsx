import React from 'react'
import '../../css/login.css'
import { FaUserLock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const NewPassword = () => {
  return (
    <div className="login-body">
      <div className="login-wrapper">
        <form>
          <h1>New Password</h1>

          <div className="input-box">
            <input type="text" name="password" placeholder="Password" required />
            <FaUserLock className="icon" />
          </div>
          <div className="input-box">
            <input type="password" name="password" placeholder="Confirm password" required />
            <FaUserLock className="icon" />
          </div>
          <br />
          <Link to="/Loginform">
            <button type="submit">Confirm</button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default NewPassword
