import React from 'react'
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
    <h1 className="text-6xl font-bold text-gray-800">404</h1>
    <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
      <Link to="/login" className="text-blue-500 text-xl hover:underline">
        Go Back Login
    </Link>
  </div>
  )
}
