import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Layout from '../../components/Layout'
import Prism from 'prismjs'
import React, { useEffect } from 'react'
import { GetStaticProps } from 'next'

export async function getStaticPaths() {
  const posts = ((context) => {
    const keys = context.keys()
    const data = keys.map((key: string) => {
      const path = key.slice(2).slice(0, -3)
      return path
    })
    return data
  })(require.context(`../../../posts`, true, /\.md$/))

  const paths = posts.map((path: string) => `/posts/${path}`)

  return {
    paths,
    fallback: false
  }
}

type PathParams = {
  slug: string[]
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as PathParams
  const content = await import(`../../../posts/${slug.join('/')}.md`)
  const config = await import(`../../../siteconfig.json`)
  const data = matter(content.default)

  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content
    }
  }
}

type Props = {
  siteTitle: string
  frontmatter: {
    title: string
    image: string
  }
  markdownBody: string
}

export default function BlogPost({ siteTitle, frontmatter, markdownBody }: Props) {
  if (!frontmatter) return <></>

  useEffect(() => {
    Prism.highlightAll()
  })

  const summary = markdownBody.split(/\r\n|\r|\n/)[0]

  return (
    <Layout pageTitle={`${frontmatter.title} | ${siteTitle}`} description={summary}>
      <article>
        <img src={frontmatter.image} alt={frontmatter.title} className="border" />
        <h1>{frontmatter.title}</h1>
        <div>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdownBody}</ReactMarkdown>
        </div>
      </article>
    </Layout>
  )
}
