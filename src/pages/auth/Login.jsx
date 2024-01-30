import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../config/firesbaseConfig';

const Login = () => {
   const navigate = useNavigate();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const loginIn = async (e) => {
     e.preventDefault();

     try {
       await signInWithEmailAndPassword(auth, email, password);
       console.log("Login successful");
       navigate('/')
     } catch (error) {
       console.log("Login error " + error);
     }
   };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="border-2 p-8 m-8 w-96 bg-white shadow-md">

        <div className="m-5">
          <img
            src="/public/images/Screenshot (228).png"
            alt=""
            className="mx-auto w-auto h-auto"
          />
        </div>

        <form onSubmit={loginIn} className="flex flex-col">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b-2 p-2 m-3 focus:outline-none focus:border-blue-500"
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b-2 p-2 m-3 focus:outline-none focus:border-blue-500"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 focus:outline-none"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login