import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [credencials, setCredencials] = useState({email:'', password:""})
        let navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:3000/user/login",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"      
            },
            body: JSON.stringify({email: credencials.email,password:credencials.password})
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
    <div className="container mt-3">
    <h2>Login to continue with iNotebook</h2>
      <form
        onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credencials.email}
            onChange={handleChange}
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
            value={credencials.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
