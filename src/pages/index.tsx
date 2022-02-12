import matter from 'gray-matter'
import Layout from '../components/Layout'
import PostList from '../components/PostList'

const Index = ({ posts, title, description, ...props }) => {
  return (
    <Layout pageTitle={title}>
      <p className="pb-8">
        このウェブサイトは
        <a href="https://twitter.com/t4traw" target="_blank">
          @t4traw
        </a>
        が日々勉強したプログラミングの事や、本・ゲーム・釣りなどの趣味に関する事を綴っているブログです。
      </p>
      <main>
        <PostList posts={posts} />
      </main>
    </Layout>
  )
}

export default Index

export async function getStaticProps() {
  const configData = await import('../../siteconfig.json')

  const posts = ((context) => {
    const keys = context.keys()
    const values = keys.reverse().map(context)

    const data = keys.map((key, index) => {
      // let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
      const path = key.slice(2).slice(0, -3)
      const value = values[index]
      const document = matter(value.default)
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        path
      }
    })
    return data
  })(require.context('../../posts', true, /\.md$/))

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description
    }
  }
}
