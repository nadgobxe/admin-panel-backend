import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div>
        <Link to="/">Home</Link>
        <Link to="/list-items">Manage Items</Link>
    </div>
  )
}
