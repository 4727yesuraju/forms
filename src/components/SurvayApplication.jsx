import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Level({formData,setFormData,errorData,setErrorData}) {


    const navigate = useNavigate();
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

    useEffect(()=>{
        setFormData({type:"Survey Form"});
        setErrorData({})
    },[]);


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

    function isValidSurvey(topic){
        let error = null;
        if(!topic || topic=='surveyTopics'){
             error = "please select atleast on topic";
        }
        if(!error){
            setErrorData(prev=>{ return  {...prev,surveyTopicsError:null}});
            return true;
        }
        setErrorData(prev=>{ return  {...prev,surveyTopicsError:error}});
        return ;
    }

    function isValidTopicSelection(){
        let error = null;
        if(formData.surveyTopics === 'Technology' && !formData.topics){
            error = "please select at least one topic."
        }

        if(!error){
            setErrorData(prev=>{ return  {...prev,topicsError:null}});
            return true;
        }
        setErrorData(prev=>{ return  {...prev,topicsError:error}});
        return ;
    }

    function isValidCourseSelection(){
        let error = null;
        if(formData.surveyTopics === 'Education' && !formData.courses){
            error = "please select at least one course."
        }

        if(!error){
            setErrorData(prev=>{ return  {...prev,coursesError:null}});
            return true;
        }
        setErrorData(prev=>{ return  {...prev,coursesError:error}});
        return ;
    }

    function isValidExerciseSelection(){
        let error = null;
        if(formData.surveyTopics === 'Health' && !formData.exercise){
            error = "please select at least one time period."
        }

        if(!error){
            setErrorData(prev=>{ return  {...prev,exerciseError:null}});
            return true;
        }
        setErrorData(prev=>{ return  {...prev,exerciseError:error}});
        return ;
    }

    function isValidDietSelection(){
        let error = null;
        if(formData.surveyTopics === 'Health' && !formData.diet){
            error = "please select at least one diet feid."
        }

        if(!error){
            setErrorData(prev=>{ return  {...prev,dietError:null}});
            return true;
        }
        setErrorData(prev=>{ return  {...prev,dietError:error}});
        return ;
    }

    function isValidFeedBack(){
        let error = null;
        if(!formData.feedback){
            error = "feedback field is required."
        }else if(formData.feedback.length<50){
            error = "feedback min length is 50."
        }
        if(!error){
            setErrorData(prev=>{ return  {...prev,feedbackError:null}});
            return true;
        }
        setErrorData(prev=>{ return  {...prev,feedbackError:error}});
        return ;
    }

    function isValidField(){
        let error = null;
        if(!formData.field)
            error = "field is required."
        if(!error){
            setErrorData(prev=>{ return  {...prev,fieldError:null}});
            return true;
        }
        setErrorData(prev=>{ return  {...prev,fieldError:error}});
        return ;
    }

    function isValidExperience(){
        let error = null;
        if(!formData.experience)
            error = "experience field is required."
        else if(formData.experience < 0)  error = "experience grater then 0."
        if(!error){
            setErrorData(prev=>{ return  {...prev,experienceError:null}});
            return true;
        }
        setErrorData(prev=>{ return  {...prev,experienceError:error}});
        return ;
    }



    function handleSubmit(e){
        e.preventDefault();
        const isNameError = isValidName(formData.name);
        const isEmailError = isValidEmail(formData.email);
        const isSurveyError = isValidSurvey(formData.surveyTopics);
        const isValidTopicSelectionError = isValidTopicSelection();
        const isValidCourseSelectionError = isValidCourseSelection();
        const isValidExerciseSelectionError = isValidExerciseSelection();
        const isValidDietSelectionError = isValidDietSelection();
        const isFeedBackError = isValidFeedBack();
        const isValidFieldError = formData.surveyTopics !== 'Education'  || isValidField();
        const isValidExperienceError = formData.surveyTopics !== 'Technology'  || isValidExperience();

 
       if (
        !isNameError ||
        !isEmailError ||
        !isSurveyError ||
        !isValidTopicSelectionError  ||
        !isValidCourseSelectionError ||
        !isValidExerciseSelectionError ||
        !isValidDietSelectionError ||
        !isFeedBackError ||
        !isValidFieldError
        ) return 
       
        if(formData.surveyTopics==="Technology"){
            if(formData.courses) delete formData.courses ;
            if(formData.exercise) delete formData.exercise ;
            if(formData.diet) delete formData.diet ;
            if(formData.field) delete formData.field;
        }
        if(formData.surveyTopics==="Health"){
            if(formData.topics) delete formData.topics ;
            if(formData.courses) delete formData.courses ;
            if(formData.experience) delete formData.experience;
            if(formData.field) delete formData.field;
        }
        if(formData.surveyTopics==="Education"){
            if(formData.exercise) delete formData.exercise 
            if(formData.diet) delete formData.diet 
            if(formData.topics) delete formData.topics ;
            if(formData.experience) delete formData.experience;
        }

        setFormData({...formData,type:"Survey Form"});
        localStorage.setItem('data',JSON.stringify(formData));
        navigate("/result")
    }



    function handleChange(e){
         if(e.target.id==='surveyTopics' && e.target.value === 'surveyTopics') errorData.surveyTopicsError = "select atleast one surveyTopic."

        setFormData({...formData,[e.target.id]:e.target.value})
    }



    const surveyTopic = ["surveyTopics","Technology", "Health", "Education"];
    const skills = ["JavaScript", "CSS", "Python", "Java", "HTML", "NodeJS", "ExpressJS"]
    
        /*        
                    Tasks:
                1. Form Fields:

                    ○ Full Name (Text)
                    ○ Email (Email)
                    ○ Survey Topic (Dropdown: Technology, Health, Education)

                    ○ Technology Section (Visible if "Technology" is selected):
                    ■ Favorite Programming Language (Dropdown: JavaScript, Python,
                    Java, C#)
                    ■ Years of Experience (Number)
                    ○ Health Section (Visible if "Health" is selected):
                    ■ Exercise Frequency (Dropdown: Daily, Weekly, Monthly, Rarely)
                    ■ Diet Preference (Dropdown: Vegetarian, Vegan, Non-Vegetarian)
                    ○ Education Section (Visible if "Education" is selected):
                    ■ Highest Qualification (Dropdown: High School, Bachelor's, Master's,
                    PhD)
                    ■ Field of Study (Text)
                    ○ Feedback (Textarea)
                2. Conditional Logic:

                    ○ Show "Technology Section" if "Technology" is selected as the survey topic.
                    ○ Show "Health Section" if "Health" is selected as the survey topic.
                    ○ Show "Education Section" if "Education" is selected as the survey topic.
                    ○ Fetch and display additional questions based on the selected survey topic
                    using an external API.
                3. Validation:

                    ○ Full Name: Required
                    ○ Email: Required and must be a valid email format
                    ○ Survey Topic: Required
                    ○ Technology Section Fields: Required if "Technology" is selected, and
                    validate accordingly
                    ○ Health Section Fields: Required if "Health" is selected, and validate
                    accordingly
                    ○ Education Section Fields: Required if "Education" is selected, and validate
                    accordingly
                    ○ Feedback: Required and must be at least 50 characters
    */

    async function fetchData(topic){
        if(!topic || topic=='surveyTopics') return;
        try {
            const res = await fetch(`${topic}.json`);
            const data = await res.json();
            setFormData({...formData,additionalTopics :{...data}})
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
       fetchData(formData.surveyTopics);
    },[formData.surveyTopics])

    console.log("formData : ",formData);
    console.log("errorData : ",errorData);

  return (
    <div className="h-screen flex items-center justify-center  ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center py-4 px-8 justify-center bg-indigo-600 text-white rounded-lg">
            <input type="text" name="name" id="name" placeholder="your full name" value={formData.name || ""} onChange={handleChange} className="border-b text-center bg-transparent"/>
            {errorData.nameError && <span className="text-red-600">{errorData.nameError}</span>}
            <input type="email" name="email" id="email" placeholder="email@gmail.com" value={formData.email || ""} onChange={handleChange} className="border-b text-center bg-transparent"/>
            {errorData.emailError && <span className="text-red-600">{errorData.emailError}</span>}
            <select onClick={handleChange} id="surveyTopics" className="bg-transparent">
                {surveyTopic.map((topic,ind)=><option key={ind} value={topic} className="text-black" >{topic}</option>)}
            </select>
            {(!(formData.surveyTopics) || (formData.surveyTopics === "surveyTopics")) && <span className="text-red-600">{errorData.surveyTopicsError}</span>}


            {
                    formData.surveyTopics === "Technology" && <div className="flex flex-col gap-2 text-center">
                    Favorite Programming Language : 
                    <select name="topics" id="topics" onClick={handleChange} className="self-start bg-transparent   ">
                        {
                            formData.additionalTopics?.FavoriteProgrammingLanguage?.map((language,ind)=><option value={language} key={ind} className="text-black">{language}</option>)
                        }
                    </select>
                    {errorData.topicsError && <span className="text-red-600">{errorData.topicsError}</span> } 
                    <input type="number" name="" placeholder="experience" id="experience" className="border-slate-500 border-b text-center  bg-transparent" value={formData.experience || ""} onChange={handleChange} />
                    {errorData.experienceError && <span className="text-red-600">{errorData.experienceError}</span>}
                </div>
            }
            {
                formData.surveyTopics === "Health" && <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                        <span className="font-semibold">exercise Section :</span>
                            <select name="exercise" id="exercise" onClick={handleChange} className="bg-transparent">
                                {
                                    formData.additionalTopics?.ExerciseFrequency?.map((item,ind)=><option value={item}  key={ind} className="text-black">{item}</option>)
                                }
                            </select>
                            {errorData.exerciseError && <span className="text-red-600">{errorData.exerciseError}</span> }
                </div>
                <div className="flex flex-col gap-1">
                        <span className="font-semibold">diet Section :</span>
                            <select name="diet" id="diet" onClick={handleChange} className="bg-transparent">
                                {
                                    formData.additionalTopics?.DietPreference?.map((item,ind)=><option value={item}  key={ind} className="text-black">{item}</option>)
                                }
                            </select>
                            {errorData.dietError && <span className="text-red-600">{errorData.dietError}</span> }
                            
                </div>
                </div>
            }
            {
                formData.surveyTopics === "Education" && <div>
                    Highest Qualification : <br />
                    <select name="courses" id="courses" onClick={handleChange} className="bg-transparent">
                        {
                            formData.additionalTopics?.HighestQualification?.map((item,ind)=><option value={item} key={ind} className="text-black">{item}</option>)
                        }
                    </select> <br />
                    {errorData.coursesError && <span className="text-red-600">{errorData.coursesError}</span> }
                    <input type="text" name="" placeholder="field of study" id="field" className="border-slate-500 border-b text-center  bg-transparent" value={formData.field || ""} onChange={handleChange}/>
                    {errorData.fieldError && <span>{errorData.fieldError}</span>}
                </div>
            }

            <textarea id="feedback" name="feedback" placeholder="feedback"  rows="2" className="outline rounded-lg text-center text-black" value={formData.feedback || ""} onChange={handleChange}/>
            {errorData.feedbackError && <span className="text-red-600">{errorData.feedbackError}</span>}
            <button className="bg-black px-8 py-2 rounded-lg">submit</button>
        </form>
    </div>
  )
}
