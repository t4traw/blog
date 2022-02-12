import 'tailwindcss/tailwind.css'
import 'prismjs/themes/prism-tomorrow.css'
import '../../styles/head.scss'
import '../../styles/article.scss'
import '../../styles/baloon.scss'
import '../../styles/ptcg.scss'
import * as gtag from '../lib/gtag'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}

export default MyApp
