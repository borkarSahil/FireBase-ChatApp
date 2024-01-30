import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../config/firesbaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [file, setFile] = useState();

  const signIn = async (e) => {
    e.preventDefault();
    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // File upload  : Store file as user name
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          console.log("File upload error", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: name,
              photoURL: downloadURL,
            });
            console.log("File available at", downloadURL);

            //
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: name,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});

            navigate("/");
          });
        }
      );
    } catch (error) {
      console.log("Registered error " + error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="border-2 p-8 m-8 w-96 bg-white shadow-md">
        
          <div className="m-5">
            <img
              src="/public/images/Screenshot (228).png"
              alt=""
              className="mx-auto w-auto h-auto"
            />
          </div>

          <form onSubmit={signIn} className="flex flex-col">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-b-2 p-2 m-3 focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Name"
            />
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
            <input
              className="border-b-2 p-2 m-3 focus:outline-none focus:border-blue-500"
              type="file"
              id="file"
              placeholder="Upload the file"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 focus:outline-none"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
