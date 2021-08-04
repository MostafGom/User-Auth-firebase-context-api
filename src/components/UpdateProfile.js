import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { currentUser, updateEmail, updatePassword } = useAuth()
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("passwords don't match")
    }

    const promises = []
    setLoading(true)
    setError('')

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises).then(() => {
      history.push('/')
    }).catch(() => {
      setError("failed to update account")
    }).finally(() => {
      setLoading(false)
    })


  }
  return (
    <>
      <Card>
        <Card.Body >
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant='danger' >{error}</Alert>}
          <Form onSubmit={handleSubmit} >
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required
                defaultValue={currentUser.email} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control placeholder="leave it blank to keep old password" type="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group id="passwordConfirm">
              <Form.Label>Password confirmation</Form.Label>
              <Form.Control placeholder="leave it blank to keep old password" type="password" ref={passwordConfirmRef} />
            </Form.Group>

            <Button disabled={loading} className="w-100 mt-4 " type="submit">Update</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to='/' >Cancel</Link>
      </div>
    </>
  )
}

export default UpdateProfile
