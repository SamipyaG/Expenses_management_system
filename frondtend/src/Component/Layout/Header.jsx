import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate("/login")
  }
  


  const [loginUser, setLoginUser] = useState('')
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setLoginUser(user)
    }
  }, [])

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">Expenses management system</Link>
            
            {/* Proper navbar list structure */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* User info */}
              <li className="nav-item">
                <span className="nav-link">
                  {loginUser && loginUser.name}
                </span>
              </li>
              
              {/* Logout button */}
              <li className="nav-item">
                <button onClick={handleLogout} className='btn btn-primary nav-link border-0 bg-transparent' style={{color: 'inherit'}}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header