import Link from 'next/link'

export default function PostLink ({ posts }) {
  if (posts === void 0) return null

  return (
    <div>
      {!posts && <div>No Posts</div>}
      <ul>
        {posts &&
          posts.map((post) => {
            return (
              <li key={post.path} className="py-4">
                <p className="text-gray-600">{post.frontmatter.date}</p>
                <Link href={{ pathname: `/posts/${post.path}` }}>
                  <a className="text-xl text-blue-500 underline">{post.frontmatter.title}</a>
                </Link>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
