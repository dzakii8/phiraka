'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation.js";
import { handleEdit } from "../functions/handle_edit";
import { handleAdd } from "../functions/handle_tambah";

export default function FormUser() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [res, setRes] = useState('')

  const queryParam = useSearchParams()
  const edit = queryParam.get('edit')
  const id = queryParam.get('id')

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    let message = ''
    if (edit == 'true') {
      let editData = {};
      if (username !== "") editData.username = username;
      if (password !== "") editData.password = password;
      message = await handleEdit({ id, ...editData });
    } else {
      message = await handleAdd({ username, password })
    }

    setRes(message)

    if (message == 'Berhasil menambahkan user' || message == 'Berhasil mengedit user') {
      setTimeout(() => {
        router.replace('/')
      }, 1500)
    }
  };

  const handleLogout = () => {
    router.replace('/login')
    localStorage.removeItem('status')
  }


  const fetchEdit = async () => {
    try {
      console.log(id);
      const response = await fetch('http://localhost:3000/api/user/' + id, {
        method: 'GET',
        cache: 'no-store',
      });
      let res = await response.json()
      setUsername(res.username)
      setPassword(res.password)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (edit == 'true') {
      fetchEdit()
    }
  }, [])


  return (
    <>
      <div className="relative">
        <div className="w-fit absolute top-0 right-0 text-white hover:bg-red-500">
          <button onClick={() => router.replace('/')} className="p-2 bg-green-400 ">
            Home
          </button>
          <button onClick={handleLogout} className="p-2 bg-red-400 ">
            Keluar
          </button>
        </div>
      </div>
      <div className="flex h-full justify-center items-center">
        {res == "" ? "" :
          <div className={`absolute ${res.includes('hasil') ? 'bg-green-400' : 'bg-red-400'} text-white bottom-0 -translate-y-2 left-1/2 -translate-x-1/2 rounded-md p-4`}>{res}</div>
        }
        <div className="w-72 h-72">

          <form className="flex flex-col justify-between gap-4 bg-white shadow-md rounded-lg w-fit h-fit p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex justify-center">
                <label
                  className="block text-gray-700 text-md font-bold mb-2 flex justify-start"
                >
                  {edit == 'true' ? 'Edit User' : 'Tambah User'}
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
                  value={username}
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
                  value={password}
                  maxlength="8"
                  minlength="5"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-center ">
              <button className="text-md shadow-md bg-blue text-white bg-gray-400 hover:bg-gray-500 px-6 py-3 border-0 rounded-lg ease-in-out duration-300 text-xs">
                {edit == 'true' ? 'Edit' : 'Tambah'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>

  )
}