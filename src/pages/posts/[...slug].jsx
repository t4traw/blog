import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Layout from '../../components/Layout'
import Prism from 'prismjs'
import React, { useEffect } from 'react'

export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
  if (!frontmatter) return <></>

  useEffect(() => {
    Prism.highlightAll()
  })

  return (
    <Layout pageTitle={`${frontmatter.title} | ${siteTitle}`}>
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

export async function getStaticProps(prop) {
  const { slug } = prop.params
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

export async function getStaticPaths() {
  const blogPaths = ((context) => {
    const keys = context.keys()
    const data = keys.map((key, index) => {
      const path = key.slice(2).slice(0, -3)
      return path
    })
    return data
  })(require.context(`../../../posts`, true, /\.md$/))

  const paths = blogPaths.map((path) => `/posts/${path}`)

  return {
    paths,
    fallback: false
  }
}
