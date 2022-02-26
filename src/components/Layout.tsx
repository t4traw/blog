import Head from 'next/head'
import { ReactElement } from 'react'
import Header from './Header'

type Props = {
  children: ReactElement
  pageTitle: string
  description: string
}

export default function Layout({ children, pageTitle, description }: Props) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
      </Head>
      <section className="container mx-auto px-4 pb-48 md:px-20 lg:px-52 xl:px-72 2xl:px-96">
        <Header />
        <div className="layout">
          <div className="content">{children}</div>
        </div>
      </section>
    </>
  )
}
