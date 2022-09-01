/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Home = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)

    if (localStorage.getItem('username') === '' || !localStorage.getItem('username')) {
      router.push('/login')
    } else {
      setUsername(localStorage.getItem('username'))
    }
  }, [router])

  useEffect(() => {
    setTimeout(async () => {
      let res = await fetch('https://randomuser.me/api/?results=600', {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      res = JSON.parse(await res.text()).results
      setContacts(res)
    }, 1000)
  }, [])

  return (
    <main className="mx-auto max-w-5xl px-5">
      <div
        className={`top-0 left-0 flex h-screen w-screen items-center justify-center bg-[#ecf0ef] ${
          loading ? 'fixed' : 'hidden'
        }`}
      >
        <img src="https://i.giphy.com/media/jAYUbVXgESSti/giphy.webp" alt="" />
      </div>
      <nav className="flex h-20 items-center justify-between">
        <h1 className="pl-0.5 font-thin">
          Logged in as: <span className="font-medium">{username}</span>{' '}
        </h1>
        <button
          className="rounded-xl bg-slate-900 p-1 px-4 text-white"
          onClick={() => {
            setUsername(localStorage.removeItem('username'))
            router.push('/login')
          }}
        >
          Log Out
        </button>
      </nav>
      <div className="grid gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-3">
        {contacts?.map((contact, key) => {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
              viewport={{ once: true }}
              className="flex items-center justify-between rounded-xl bg-slate-200 p-3 text-black"
              key={key}
            >
              <p>
                {contact.name.first} {contact.name.last}
              </p>
              <img
                className="h-12 w-12 rounded-full border-[1px] border-slate-500"
                src={contact.picture.medium}
                alt={contact.name.first}
              />
            </motion.div>
          )
        })}
      </div>
    </main>
  )
}

export default Home
