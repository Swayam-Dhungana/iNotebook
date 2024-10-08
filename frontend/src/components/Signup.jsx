import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [credencials, setCredencials] = useState({name:'',email:'', password:"", cpassword:''})
    let navigate=useNavigate();

const handleSubmit=async(e)=>{
    e.preventDefault();
    const {name, email, password, cpassword}=credencials;
    const response=await fetch("http://localhost:3000/user/createUser",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"      
        },
        body: JSON.stringify({name, email, password, cpassword})
    })
    const json=await response.json()
    console.log(json);
    if(json.success){
        localStorage.setItem("token", json.authToken)
        navigate('/')
    }
    else{
        alert("Invalid credentials")
    }
}
const handleChange=(e)=>{
    setCredencials({...credencials, [e.target.name]: e.target.value})
}

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="name" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            aria-describedby="emailHelp"
            name='name'
            onChange={handleChange}
            value={credencials.name}
          />
          <label for="email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={handleChange}
            value={credencials.email}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            value={credencials.password}
          />
        </div>
        <div class="mb-3">
          <label for="cpassword" class="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            class="form-control"
            id="cpassword"
            name="cpassword"
            onChange={handleChange}
            value={credencials.cpassword}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
