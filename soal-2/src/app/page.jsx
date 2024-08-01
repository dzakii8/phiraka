'use client'

import { usePathname, useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react'
export const Context = createContext();
import Content from '../components/content'


export default function Page() {
  const [isLogin, setIsLogin] = useState(false);

  const path = usePathname()
  const router = useRouter()
  const checkLoginStatus = () => {
    const token = localStorage.getItem('status');
    if (token == "undefined" || token == "null" || token == undefined || token == null) { setIsLogin(false); return router.replace('/login') }
    if ((token != "undefined" || token != "null" || token != undefined || token != null) && path == "/login") { setIsLogin(true); return router.replace('/') }
  }

  useEffect(() => {
    checkLoginStatus()
  }, [isLogin]);

  return (
    <>
      <Content />
    </>
  )
}
