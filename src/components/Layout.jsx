import Head from 'next/head'
import Header from './Header'

export default function Layout ({ children, pageTitle, ...props }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{pageTitle}</title>
      </Head>
      <section className='container mx-auto pb-48 px-4 md:px-20 lg:px-52 xl:px-72'>
        <Header />
        <div className='layout'>
          <div className='content'>{children}</div>
        </div>
      </section>
    </>
  )
}