import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    if (router.asPath.split('/')[1] === '') {
      router.push('/home')
    }
  }, [router])

  return (
    <div className="relative h-screen w-screen overflow-x-hidden">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
