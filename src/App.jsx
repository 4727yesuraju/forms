import { Route, Routes } from "react-router-dom";
import {  useState } from 'react'

import JobApplication from "./components/JobApplication"
import Event from "./components/Event"
import SurvayApplication from "./components/SurvayApplication"
import Header from "./components/Header";
import Result from "./components/Result";

function App() {

  const [formData,setFormData] = useState({});
  const [errorData,setErrorData] = useState({});

  return (
    <>
      <Header/>
      <Routes>
          <Route path="/" element={<h1 className="mt-16 text-center font-bold text-xl">click above to start</h1>} />
          <Route path="/event" element={
            <Event formData={formData} setFormData={setFormData} errorData={errorData} setErrorData={setErrorData}  />
          } />
          <Route path="/job" element={
            <JobApplication formData={formData} setFormData={setFormData} errorData={errorData} setErrorData={setErrorData}  />
          } />
          <Route path="/survey" element={
            <SurvayApplication formData={formData} setFormData={setFormData} errorData={errorData} setErrorData={setErrorData} />
          } />
          <Route path="/result" element={<Result  formData={formData} />}/>
      </Routes>
    </>
  )
}

export default App
