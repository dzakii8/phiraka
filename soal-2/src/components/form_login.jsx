'use client'
import { useState } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import { handleLogin } from './../functions/handle_login.js'
import { useRouter } from "next/navigation.js";

export default function FormLogin() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [res, setRes] = useState('')

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA');
      return;
    }
    let message = await handleLogin(username, password)
    setRes(message)

    if (message == 'Login berhasil') {
      setTimeout(() => {
        router.replace('/')
      }, 1500)
    }
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  let YOUR_SITE_KEY = '6LcMGR0qAAAAAOtDVz3ZjcE6dqxiATXSYFT5EXaS'
  return (
    <div className="flex h-full justify-center items-center">
      {res == "" ? "" :
        <div className={`absolute ${res == 'Login berhasil' ? 'bg-green-400' : 'bg-red-400'} text-white bottom-0 -translate-y-2 left-1/2 -translate-x-1/2 rounded-md p-4`}>{res}</div>
      }
      <div className="w-72 h-72">

        <form className="flex flex-col justify-between gap-4 bg-white shadow-md rounded-lg w-fit h-fit p-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex justify-center">
              <label
                className="block text-gray-700 text-md font-bold mb-2 flex justify-start"
              >
                Login
              </label>
            </div>
            <div className="">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 flex justify-start"
                htmlFor="username"
              >
                Username:
              </label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-black focus:outline-none  bg-white"
                id="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 flex justify-start"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <button className="shadow-md bg-blue text-white bg-gray-400 hover:bg-gray-500 px-6 py-3 border-0 rounded-lg ease-in-out duration-300 text-xs">
              login
            </button>
          </div>
        </form>
        <div className="w-8 my-4">
          <ReCAPTCHA
            sitekey={YOUR_SITE_KEY}
            onChange={handleRecaptchaChange}
          />
        </div>
      </div>
    </div>
  )
}