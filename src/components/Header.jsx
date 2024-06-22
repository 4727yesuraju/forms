import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const url = window.location.pathname.slice(1);
  return (
    <div className="flex  w-screen fixed top-0 left-0 text-center">
        <Link to="/event" className={`truncate text-nowrap cursor-pointer  ${url==='event' ? "bg-white text-black" : "bg-black text-white"} basis-1/3 p-4`}>Event Registration Form</Link>
        <Link to="/job" className={` truncate text-nowrap cursor-pointer ${url==='job' ? "bg-white text-black" : "bg-black text-white"} basis-1/3 p-4`}>Job Application Form</Link>
        <Link to="/survey" className={` truncate text-nowrap cursor-pointer  ${url==='survey' ? "bg-white text-black" : "bg-black text-white"} basis-1/3 p-4`}>Survey Form</Link>
    </div>
  )
}
