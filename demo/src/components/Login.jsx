import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { setValidUser } from '../Redux/actions';

export const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [input, setInput] = useState({username: "", password: ""})
  const [users, setUsers] = useState(null)

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    fetch('http://localhost:8080/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])

  const handleLogin = () => {
    let validUser = users.filter(user => user.username === input.username && user.pass === input.password)
    console.log(validUser)
    if ( validUser !== [] ) {
      dispatch(setValidUser(validUser))
      if ( validUser[0].role === "admin" ) {
        navigate("/orders")
      }
      else if ( validUser[0].role === "client" ) {
        navigate("/neworder")
      }
    }
  }

  return (
    <div>
      <input
        className="username"
        type="text"
        name="username"
        placeholder="Enter Username"
        onChange={handleInput}
      />
      <input
        className="password"
        type="password"
        name="password"
        placeholder="Enter password"
        onChange={handleInput}
      />
      {/* On this button click make network req to find user with same username and password */}
      {/* get his role, if role is `admin` take him to `/orders` page otherwise take him to `/neworder` */}
      <button className="submit" onClick={handleLogin}>Login</button>
    </div>
  );
};
