import { Alert } from 'bootstrap'
import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const handleLogout = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await logout()
      history.pushState('/')
    } catch {
      return "failed to logout try again"
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Main Profile page</h2>
          {error && <Alert variant='danger' >{error}</Alert>}
          <strong>Email: </strong>{currentUser.email}
          <Link to='/update-profile'
            className="btn btn-primary w-100 mt-4"
          >
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant='link' onClick={handleLogout} className='mt-4'>Log Out</Button>
      </div>
    </>
  )
}

export default Dashboard
