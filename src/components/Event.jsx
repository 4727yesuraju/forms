import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Event({formData,setFormData,errorData,setErrorData}) {

    /*        
        Tasks:
        1. Form Fields:
            ○ Name (Text)
            ○ Email (Email)
            ○ Age (Number)
            ○ Are you attending with a guest? (Yes/No)
            ○ Guest Name (Text, visible only if attending with a guest)
        2. Conditional Logic:
            ○ Show the "Guest Name" field only if the "Are you attending with a guest?"
            field is answered with "Yes".
        3. Validation:
            ○ Name: Required
            ○ Email: Required and must be a valid email format
            ○ Age: Required and must be a number greater than 0
            ○ Guest Name: Required if attending with a guest
        4. Submission:
            ○ On form submission, display a summary of the entered data. 
    */


    const navigate = useNavigate();
    useEffect(()=>{
        setFormData({type:"Event Registration Form"});
        setErrorData({})
    },[]);



    function isValidName(name){
        let error = null;
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

    function isValidGuestName(name){
        let error = null;
        if(!name) {
            error = "guest name must be required!"
        }
        else if((name.charAt(0) >= '0' && name.charAt(0) <='9'))  {
            error = "guest name must be start with alphabet."
        }   
        if(!error)  {
            setErrorData(prev=>{ return  {...prev,guestNameError:null}});
            return true;
        }
        setErrorData(prev=>{ return  {...prev,guestNameError:error}});
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
            error = "age must be includes";
        }else if(isNaN(Number(number)) ||    (Number(number)<=0 || Number(number)>110)){
            error = " enter number only between 0 to 110"
        }
        if(!error)  {
            setErrorData(prev=>{ return  {...prev,ageError:error}});
            return true;
        }
        setErrorData(prev=>{ return  {...prev,ageError:error}});
        return ;
    }

    function handleSubmit(e){
        e.preventDefault();
        const isNameError = isValidName(formData.name);
        const isEmailError = isValidEmail(formData.email);
        const isAgeError = isNumber(formData.age);
        const isGuestNameError = ( !formData.isAttend ||  isValidGuestName(formData.guestName));
       if (
        !isNameError ||
        !isEmailError||
        !isAgeError|| 
        !isGuestNameError
        ) return 
       
        localStorage.setItem('data',JSON.stringify(formData));
        navigate('/result');
    }

    function handleIsAttend(e){
       if(!e.target.checked) return;
       setFormData({...formData,isAttend:!formData.isAttend})
    }

    function handleChange(e){
        setFormData({...formData,[e.target.id]:e.target.value})
    }

  return (
    <div className="h-screen  flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center bg-black text-slate-400 py-10 px-5 rounded-lg shadow-xl mb-48">
            <input type="text" name="name" id="name" placeholder="your name" value={formData.name || ""} onChange={handleChange} className="border-b text-center rounded-lg"/>
            {errorData.nameError && <span className="text-red-600">{errorData.nameError}</span>}
            <input type="text" name="email" id="email" placeholder="email@gmail.com" value={formData.email || ""} onChange={handleChange} className="border-b-2 text-center rounded-lg"/>
            {errorData.emailError && <span className="text-red-600">{errorData.emailError}</span>}
            <input type="text" name="age" id="age" placeholder="how old you are?" value={formData.age || ""} onChange={handleChange} className="border-b-2 text-center rounded-lg"/>
            {errorData.ageError && <span className="text-red-600">{errorData.ageError}</span>}
            <div >
                Are you attending with a guest?
                <div className="flex justify-center items-center gap-4">
                    <label>
                        <input type="checkbox" name="" id="" checked={formData.isAttend || false} onChange={handleIsAttend}/> yes
                    </label>
                    <label>
                        <input type="checkbox" name="" id="" checked={(formData.isAttend!=undefined) && !formData.isAttend } onChange={handleIsAttend}/> no
                    </label>
                </div>
            
            </div>
            {
                formData.isAttend && <input type="text" name="guestName" id="guestName" placeholder="guest name" value={formData.guestName || ""} onChange={handleChange} className="border-b-2 text-center rounded-lg"/>
            }
            {
                errorData.guestNameError && <span className="text-red-500">{errorData.guestNameError}</span>
            }
            <button className="bg-green-600 text-white py-2 px-8 rounded-lg">submit</button>
        </form>
    </div>
  )
}
