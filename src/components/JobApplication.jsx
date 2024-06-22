import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Level({formData,setFormData,errorData,setErrorData}) {

  
    const navigate = useNavigate();

    useEffect(()=>{
        setFormData({type : "Job Application Form"});
        setErrorData({})
    },[]);


    function isValidURL(url){
        try {
            new URL(url);
            setErrorData(prev=>{ return  {...prev,URLError:null}});
            return true;
        } catch (err) {
            setErrorData(prev=>{ return  {...prev,URLError:"invalid URL"}});
            return false;
        }
    }

    function isValidName(name){
        let error = null;
        console.log(name);
        if(!name) {
            error = "name must be required!"
        }
        else if(!isNaN(Number(name)))  {
            error = "name must be start with alphabet."
        }   
        if(!error)  {
            setErrorData(prev=>{ return  {...prev,nameError:null}});
            return true;
        }
        setErrorData(prev=>{ return  {...prev,nameError:error}});
        return;
    }

    function isValidEmail(email){   
        let error = null
        if(!email){
            error = "email must be required";
        }else if(email.slice(-10,)!=="@gmail.com"){
            error = 'enter only email format';
        }
        if(!error)  {
            setErrorData(prev=>{ return  {...prev,emailError:null}});
            return true;
        }
        setErrorData(prev=>{ return  {...prev,emailError:error}});
        return; 
    }

    function isNumber(number){
        let error = null;
        if(!number){
            error = "number field is required!";
        }
        else if(String(number).length!=10){
            error = "phone number must have 10 digits.";
        }
        if(!error)  {
            setErrorData(prev=>{ return  {...prev,phoneNoError:error}});
            return true;
        }
        setErrorData(prev=>{ return  {...prev,phoneNoError:error}});
        return ;
    }

    function isRelevantExperienceErrorOk(number){
        let error = null;
        if(!number){
            error = "number field is required!";
        }
        else if(number < 1 ){
            error = "experience must be greater then 0";
        }
        if(!error)  {
            setErrorData(prev=>{ return  {...prev,relevantExperience:error}});
            return true;
        }
        setErrorData(prev=>{ return  {...prev,relevantExperience:error}});
        return ;
    }

    function isSkill(skills){
        let error = null;
        if(!skills || skills?.length===0){
            error = "atleast one skill must be selected!"
            console.log("error : ",error);
        }
        if(!error){
            setErrorData(prev=>{return {...prev,skillsError : error}});
            return true;
        }
        setErrorData(prev=>{return {...prev,skillsError : error}});
        return ;
    }

    function isTimeOk(date){
         let error = null;
         if(!date){
            error = "select interiew date";
         }else{
          let time = date.slice(date.indexOf('T')+1);
          console.log("time :",time);
          if(time < '09:00' || time > '17:00'){
            error = "time slot between 09:00am to 05:00pm"
          }else if(time < new Date().toTimeString().slice(0,5)){
               error = `select ${new Date().toTimeString().slice(0,5)} above`
          }
         }
         if(!error){
            setErrorData(prev=>{return {...prev,datetimeLocalError : error}});
            return true;
        }
        setErrorData(prev=>{return {...prev,datetimeLocalError : error}});
        return ;
    }

    function handleSubmit(e){
        e.preventDefault();
        const isNameError = isValidName(formData.name);
        const isEmailError = isValidEmail(formData.email);
        const isPhoneNoError = isNumber(formData.phoneNo);
        const isSkillError = isSkill(formData.skill);
        const isTimeError = isTimeOk(formData.datetimeLocal);
        const isRelevantExperienceError = !(['Developer','Designer'].includes(formData.position)) || isRelevantExperienceErrorOk(formData.relevantExperience)
        const isportfolioURLError = !(formData.position === 'Designer') || isValidURL(formData.portfolioURL);

        if(formData.position === "Developer"){
            if(formData.managementExperience)  delete formData.managementExperience
            if(formData.portfolioURL) delete formData.portfolioURL
        }
        if(formData.position === 'Designer'){
            if(formData.managementExperience)  delete formData.managementExperience
        }
        if(formData.position === 'Manager'){
            if(formData.portfolioURL) delete formData.portfolioURL
            if(formData.relevantExperience) delete formData.relevantExperience;
        }

       if (
        !isNameError ||
        !isEmailError||
        !isPhoneNoError ||
        !isSkillError ||
        !isRelevantExperienceError ||
        !isportfolioURLError ||
        !isTimeError
        ) return 
       
        setFormData({...formData,type:"Job Application"});
        localStorage.setItem('data',JSON.stringify(formData));
        navigate('/result');
    }



    function handleChange(e){
        if(e.target.id==='position' && e.target.value) errorData.positionError = "select atleast one positions"

        if(e.target.id === 'skill') {
            let skillArray = formData.skill || [];
            if(skillArray.includes(e.target.value)){
                skillArray = skillArray.filter(skill=>skill!=e.target.value)
            }else{
                skillArray.push(e.target.value);
            }
            setFormData({...formData,[e.target.id]:[...skillArray]})
            return ;
        }
        setFormData({...formData,[e.target.id]:e.target.value})
    }

    console.log("formData : ",formData);
    console.log("errorData : ",errorData);

    const positions = ["select position","Developer", "Designer", "Manager"];
    const skills = ["JavaScript", "CSS", "Python", "Java", "HTML", "NodeJS", "ExpressJS"]
    
    /*        
       Form Type: Job Application Form
            Tasks:
            1. Form Fields:
                ○ Full Name (Text)
                ○ Email (Email)
                ○ Phone Number (Number)
                ○ Applying for Position (Dropdown: Developer, Designer, Manager)
                ○ Relevant Experience (Number of years, visible if "Developer" or "Designer"
                is selected)
                ○ Portfolio URL (Text, visible if "Designer" is selected)
                ○ Management Experience (Text, visible if "Manager" is selected)
                ○ Additional Skills (Multiple checkboxes: JavaScript, CSS, Python, etc.)
                ○ Preferred Interview Time (Date and Time Picker)
            2. Conditional Logic:
                ○ Show "Relevant Experience" if "Developer" or "Designer" is selected.
                ○ Show "Portfolio URL" if "Designer" is selected.
                ○ Show "Management Experience" if "Manager" is selected.
            3. Validation:
                ○ Full Name: Required
                ○ Email: Required and must be a valid email format
                ○ Phone Number: Required and must be a valid number
                ○ Relevant Experience: Required if "Developer" or "Designer" is selected, and
                must be a number greater than 0
                ○ Portfolio URL: Required if "Designer" is selected, and must be a valid URL
                ○ Management Experience: Required if "Manager" is selected
                ○ Additional Skills: At least one skill must be selected
                ○ Preferred Interview Time: Required and must be a valid date and time
    */

  return (
    <div className="h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center justify-center bg-[aqua] py-4 px-10 text-black rounded-xl shadow-2xl">
            <input type="text" name="name" id="name" placeholder="your full name" value={formData.name || ""} onChange={handleChange} className="border-slate-500 border-b text-center  bg-transparent"/>
            {errorData.nameError && <span className="text-red-600">{errorData.nameError}</span>}
            <input type="email" name="email" id="email" placeholder="email@gmail.com" value={formData.email || ""} onChange={handleChange} className="border-slate-500 border-b text-center  bg-transparent"/>
            {errorData.emailError && <span className="text-red-600">{errorData.emailError}</span>}
            <input type="number" name="phoneNo" id="phoneNo" placeholder="phone number" value={formData.phoneNo || ""} onChange={handleChange} className="border-slate-500 border-b text-center  bg-transparent"/>
            {errorData.phoneNoError && <span className="text-red-600">{errorData.phoneNoError}</span>}
            <select onClick={handleChange} id="position" className="bg-transparent  outline:none w-full">
                {positions.map((position,ind)=><option key={ind} value={position} >{position}</option>)}
            </select>
            {formData.position === "select position" && <span className="text-red-600">{errorData.positionError}</span>}

            {positions.slice(1,3).includes(formData.position) && <div className="flex flex-col">
                    <input type="number" name="" placeholder="experience" id="relevantExperience" className="border-slate-500 border-b text-center  bg-transparent" value={formData.relevantExperience || ""} onChange={handleChange}/>
                    {errorData.relevantExperience && <span className="text-red-500">{errorData.relevantExperience}</span>}
                </div>}
            
            {formData.position === "Designer" && <div>
                    <input type="text" name="" placeholder="portfolio URL" id="portfolioURL" className="border-slate-500 border-b text-center  bg-transparent" value={formData.portfolioURL || ""} onChange={handleChange}/>
                    {errorData.URLError && <span className="text-red-500">{errorData.URLError}</span>}
            </div> }

            {formData.position === "Manager" && <div>
                    <input type="text" name="" placeholder="Management Experience" id="managementExperience" className="border-slate-500 border-b text-center  bg-transparent" value={formData.managementExperience || ""} onChange={handleChange}/>
            </div> }

            <div className="text-center self-start">
                <span className="font-bold">Additional Skills : </span>
                <div className="flex flex-col items-start">
                    {
                        skills.map((skill,ind)=>
                        <label className="flex gap-2" key={ind}>
                            <input type="checkbox" id="skill" value={skill} onChange={handleChange} />{skill}
                        </label>
                    ) 
                    }
                </div>
                {
                    errorData.skillsError && <span className="text-red-600">{errorData.skillsError}</span>
                }
            </div>

            <div className="flex flex-col">
                <span>Preferred Interview Time : </span>
                <input type="datetime-local" name="datetimeLocal" id="datetimeLocal" min={new Date().toISOString().split(".")[0].slice(0,-3)}  value={formData.datetimeLocal || ""} onChange={handleChange} className="bg-transparent"/>
                {errorData.datetimeLocalError && <span className="text-red-600">{errorData.datetimeLocalError}</span> }
            </div>

            <button className="bg-black text-[aqua] py-2 px-8 rounded-lg">submit</button>
        </form>
    </div>
  )
}
