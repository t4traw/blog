import Layout from '../components/Layout'

const About = ({ title, description, ...props }) => {
  return (
    <>
      <Layout pageTitle={`Tatsuro Moriyama | ${title}`} description={description}>
        <article>
          <h1>Tatsuro Moriyama</h1>
          <p>WEBエンジニア・WEBデザイナー</p>
          <ul>
            <li>
              <a href="https://twitter.com/t4traw" target="_blank" rel="noreferrer">Twitter</a>
            </li>
            <li>
              <a href="https://github.com/t4traw" target="_blank" rel="noreferrer">GitHub</a>
            </li>
            <li>
              <a href="https://www.instagram.com/t4trawm/" target="_blank" rel="noreferrer">Instagram</a>
            </li>
          </ul>
          <p>1985年 愛知県豊橋市出身</p>
          <p>
            地元の通販会社にWEBデザイナー・WEBエンジニアとして就職。フロントサイドから業務アプリケーションまで、いろいろ制作・開発してきました。なので、一般的なWEB制作会社とは少し違った、『ECに関連するお仕事』や『その会社ごとの特殊なケース・問題』を解決するのが得意です。そういった記事をブログに書いていきたいと思います。
          </p>
          <p>また、いつか学んだ知識や技術で人の役にたつ事ができたらいいなと、日々勉強しています。</p>
          <h2>Favorite</h2>
          <ul>
            <li>音楽</li>
            <li>ウイスキー</li>
            <li>プログラミング</li>
            <li>ロードバイク</li>
            <li>キャンプ</li>
            <li>ビデオゲーム</li>
            <li>ドイツゲーム・アナログゲーム</li>
            <li>珈琲</li>
            <li>本</li>
          </ul>
          <p>
            ↑のキーワードが好きな方はぜひ
            <a href="https://twitter.com/t4traw" target="_blank">Twitter(@t4traw)</a>のフォローをしてください！
          </p>
          <h2>Dev</h2>
          <ul>
            <li>CSS(Sass)</li>
            <li>Ruby(Rails, Sinatra, Middleman)</li>
            <li>JavaScript(VueJS/NuxtJS, Electron)</li>
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

export async function getStaticProps () {
  const configData = await import('../../siteconfig.json')

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description
    }
  }
}