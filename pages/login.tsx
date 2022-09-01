import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('username')) {
      router.push('/home')
    }
  }, [router])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    if (username !== '' && password !== '') {
      localStorage.setItem('username', username)
      router.push('/home')
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="relative">
          <label className="absolute -top-1 left-4 bg-white px-1 text-slate-500">Username</label>
          <input
            className="mt-2 w-full rounded-lg border-[1px] border-gray-300 p-2.5 px-5 text-center text-lg focus:border-slate-600 focus:text-black"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="relative mt-5">
          <label className="absolute -top-1 left-4 bg-white px-1 text-slate-500">Password</label>
          <input
            className="mt-2 w-full rounded-lg border-[1px] border-gray-300 p-2.5 px-5 text-center text-lg focus:border-slate-600 focus:text-black"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="mt-10 flex w-full justify-center rounded-lg bg-slate-600 p-3 text-white" onClick={login}>
          Login
        </button>
      </div>
    </main>
  )
}

export default Home
