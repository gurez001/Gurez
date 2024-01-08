import React, { useState } from 'react';
import './Contact.css';

const ContactForm = () => {
/*const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [subject,setSubject]=useState("");
const [message,setMessage]=useState("");*/
const [inputValue,setinputValue]=useState({
  name:"",
  email:"",
  subject:"",
  message:""
})
const handleinputValue=(e)=>{
  const {
    name,value
  }=e.target
  setinputValue({...inputValue,[name]:value})
 

}
const handlesubmitForm=(e)=>{
  // e.preventDefault;
  console.log(inputValue)

}

  return (
   <>
   <form onSubmit={handlesubmitForm}>
   <div className='contact-form-main'>
      <label>Your Name<br/>
        <input type='text' value={inputValue.name} name="name" onChange={handleinputValue} required />
      </label>
     <label>Your Email <br/>
        <input type='email' value={inputValue.email} name="email" onChange={handleinputValue} required />
      </label>
      <label>Your Subject <br/>
        <input type='text' value={inputValue.subject} name="subject" onChange={handleinputValue} required />
      </label>
      <label>Message <br/>
       <textarea rows="4" cols="50" value={inputValue.message} name="message" onChange={handleinputValue} />
      </label>
      <button type="Submit">Submit</button>

    
    </div>
   </form>
   </>
  )
}

export default ContactForm
