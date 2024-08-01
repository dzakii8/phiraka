'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Content() {

  let [users, setUsers] = useState([])
  const [res, setRes] = useState('')

  useEffect(() => {
    fetchData()
  }, [res])

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'DELETE',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });
      const prod = await response.json()
      setRes(prod.message)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchData = async (username, password) => {

    try {
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'GET',
        cache: 'no-store',
      });
      const prod = await response.json()
      setUsers(prod)
    } catch (error) {
      console.log(error);
    }
  }
  const router = useRouter()

  const handleLogout = () => {
    router.replace('/login')
    localStorage.removeItem('status')
  }

  return (
    <>
      {res == "" ? "" :
        <div className={`absolute ${res == 'Login berhasil' ? 'bg-green-400' : 'bg-red-400'} text-white bottom-0 -translate-y-2 left-1/2 -translate-x-1/2 rounded-md p-4`}>{res}</div>
      }
      <div className="relative">
        <div className="w-fit absolute top-0 right-0 text-white hover:bg-red-500">
          <button onClick={handleLogout} className="p-2 bg-red-400 ">
            Keluar
          </button>
        </div>
      </div>
      <div className="flex flex-col h-full py-20 gap-4 items-center">
        <div className="block text-gray-700 text-md font-bold mb-2 flex justify-start">Daftar User</div>
        <div className="overflow-x-auto">
          <button className="text-blue-500 underline hover:font-bold" onClick={() => router.replace('/form?edit=false')}>Tambah User</button>
          <table className="table-auto bg-gray-100 border-separate shadow-lg radius-md border-slate-300 border w-full">
            <thead>
              <tr>
                <th className="text-black border border-slate-400 px-4 py-2">No.</th>
                <th className="text-black border border-slate-400 px-4 py-2">Nama</th>
                <th className="text-black border border-slate-400 px-4 py-2">Password</th>
                <th className="text-black border border-slate-400 px-4 py-2">Ctime</th>
                <th className="text-center text-black border border-slate-400 px-4 py-2">Fungsi</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((item, i) => (
                <tr key={i} className="text-grey-400">
                  <td className="border border-slate-400 px-4 py-2">{i + 1}.</td>
                  <td className="border border-slate-400 px-4 py-2">{item.username}</td>
                  <td className="border border-slate-400 px-4 py-2">{item.password}</td>
                  <td className="border border-slate-400 px-4 py-2">{item.createtime.slice(0, 10)}</td>
                  <td className="border border-slate-400 px-4 py-2">
                    <div className="flex gap-2">
                      <button className="btn-sm btn-ghost text-sm w-16 bg-base-content hover:underline text-blue-500" onClick={() => router.replace(`/form?edit=true&id=${item.id}`)}>Edit</button>
                      <button className="btn-sm btn-ghost text-sm w-16 bg-warning hover:underline text-red-500" onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}