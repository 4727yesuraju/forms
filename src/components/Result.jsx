import React from 'react'

export default function Result() {
  
  const formData = JSON.parse(localStorage.getItem("data"));
  return (
    <div className="mt-16">
        <span className="text-2xl font-bold">result : </span>
        {
          formData.type === 'Event Registration Form' && <div>

          </div>
        }
        <pre className="">
                {JSON.stringify(formData,null,2)}
        </pre>
    </div>
  )
}
