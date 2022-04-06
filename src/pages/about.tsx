import Layout from '../components/Layout'

export async function getStaticProps() {
  const configData = await import('../../siteconfig.json')

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description
    }
  }
}

type Props = {
  title: string
  description: string
}

const About = ({ title, description }: Props) => {
  return (
    <>
      <Layout pageTitle={`Tatsuro Moriyama | ${title}`} description={description}>
        <article>
          <h1>Tatsuro Moriyama</h1>
          <p>WEBエンジニア・WEBデザイナー</p>
          <ul>
            <li>
              <a href="https://twitter.com/t4traw" target="_blank" rel="noreferrer">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://github.com/t4traw" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/t4trawm/" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
          </ul>
          <p>1985年 愛知県豊橋市出身</p>
          <p>地元の通販会社にWEBデザイナー・WEBエンジニアとして、フロントエンドから業務アプリケーションまで経験。</p>
          <p>また、いつか学んだ知識や技術で人の役にたつ事ができたらいいなと、日々勉強しています。</p>
          <h2>すきなこと</h2>
          <ul>
            <li>音楽</li>
            <li>ウイスキー</li>
            <li>珈琲</li>
            <li>ロードバイク</li>
            <li>キャンプ</li>
            <li>ビデオゲーム</li>
            <li>ドイツゲーム・アナログゲーム</li>
            <li>本</li>
          </ul>
          <p>
            ↑のキーワードが好きな方はぜひ
            <a href="https://twitter.com/t4traw" target="_blank">
              Twitter(@t4traw)
            </a>
            のフォローをしてください🙆‍♂️
          </p>
          <h2>開発</h2>
          <ul>
            <li>Ruby, Rails, Sinatra, Middleman</li>
            <li>JavaScript, TypeScript, React.js, Next.js</li>
            <li>CSS, Sass, Bulma, Tailwind.css</li>
            <li>Server(Linux, Heroku, Netlify, Vercel)</li>
            <li>AWS(Lambda, S3, ElasticTranscoder)</li>
            <li>Illustrator</li>
            <li>Photoshop</li>
          </ul>
        </article>
      </Layout>
    </>
  )
}

export default About
