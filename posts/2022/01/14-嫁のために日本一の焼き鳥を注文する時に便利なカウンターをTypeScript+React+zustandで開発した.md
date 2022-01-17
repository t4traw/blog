---
title: 嫁のために日本一の焼き鳥を注文する時に便利なカウンターをTypeScript, React, zustand, TailwindCSS, Viteで開発した
date: '2022-01-14'
archives: ["2022/01"]
categories:
  - 開発
tags:
  - TypeScript
  - React
  - zustand
  - vite
  - TailwindCSS
image: /images/2022-01-14_21-57-55.png
---
我が家……というか嫁が『**日本一**』という焼き鳥屋さんの大ファンです。レバーが苦手なのに、ここのレバー串は食べられてかつ美味しいみたいで、よく週末に足を運んでいます。

子供が小さいうちは自分たちだけので良かったのですが、子供が大きくなるにつれて1人3本好きなの選んで良いルールができました。

が、その時にいつも嫁が大変そうで

<div class="balloon_left">
  <div class="img"><img src="/images/musume.png"></div>
  <p>わたし、ぼんじりのタレと、青じそつくねと、かわのしおー</p>
</div>

<div class="balloon_left">
  <div class="img"><img src="/images/musuko.png"></div>
  <p>ぼく、かわのタレと、つくねと、かわのしおー</p>
</div>

<div class="balloon_left">
  <div class="img"><img src="/images/t4traw.jpg"></div>
  <p>あ、自分、ぼんじりのしお、ひなどりしお、青じそつくねでお願いします</p>
</div>

<div class="balloon_right">
  <div class="img"><img src="/images/yome.png"></div>
  <p>ちょっとまて</p>
</div>

<div class="balloon_left">
  <div class="img"><img src="/images/t4traw.jpg"></div>
  <p>あ、今日ぼんじり売り切れてるね。俺じゃあナンコツかなー</p>
</div>

<div class="balloon_left">
  <div class="img"><img src="/images/musume.png"></div>
  <p>じゃあ、つくねー</p>
</div>

<div class="balloon_left">
  <div class="img"><img src="/images/musuko.png"></div>
  <p>やっぱぼくつくねやめて、青じそつくね！</p>
</div>

<div class="balloon_right">
  <div class="img"><img src="/images/yome.png"></div>
  <p>ちょっとまて</p>
</div>


毎回頼むのがバラバラかつ売り切れのもあるため、頼むものを覚えるのがすごく大変そうでした😇

なので、これをメモするための簡単なアプリ的なモノを作ってあげようと思っていたのですが、ちょうどよく（？）ノロウイルスに感染して3日間会社を休むことになりました🤢

少し症状の落ち着いた時間に、今年から本格的に触る事になったTypeScriptとReact周りの技術スタックで、1つアプリケーションを作ってみました！

![](/images/2022-01-15_21-45-32.gif)

[日本一 焼き鳥カウンター](https://yakitori-counter.vercel.app/)

焼き鳥や惣菜のメニューをプラスマイナスボタンで増減させ、合計金額が下に表示されるというシンプルなアプリケーションです😊

技術スタックは

- TypeScript
- React
- zustrand
- Vite
- TailwindCSS

といった構成で開発しました🎉

いやぁ、全然書けないし、「あーRubyだったらこうサっと書けるんだけどなーJSだとどうやるん？？」となる事も多々ありますが、最近のフロントエンドって書いてて本当に楽しいんですよねー。

今回本当に始めましてなのはzustandちゃんとViteちゃんですが、正直TypeScriptもReactもHello world程度の事しか書いた事なかったので、本当に楽しく書けました🥰

## zustandは初心者でも分かりやすいシンプルな状態管理ライブラリ

Reactの状態管理ライブラリはいくつかある（ReduxとかRecoilとかありますよね）のを知っていて、いつも見るたびに「とりあえずシンプルなのはどれなんだろう……」と迷っていました。

そんな自分にフレンドが「zustandシンプルでいいぞ」とオススメしてくれました。確かに実際使ってみて、シンプルで使いやすかったです。

<div class="filename">src/store.ts</div>

```typescript
import create from 'zustand'

interface State {
  price: number
  increase: (price: number) => void
  decrease: (price: number) => void
  reset: () => void
}

export const useStore = create<State>((set) => ({
  price: 0,
  increase: (price) => set((state) => ({ price: state.price + price })),
  decrease: (price) => set((state) => ({ price: state.price - price })),
  reset: () => set({ price: 0 })
}))
```

とStoreを作っておいて、使う時は、

```typescript
import { useStore } from './store'

const state = useStore()
state.increase(price)
```

で使えるという、シンプル大好き向けのライブラリでした！

ただ他のライブラリと色々比較したり、またアプリケーションによって「ここがマッチしないなぁ」と思う部分があるかもしれないので、そのときはまた書こうと思います✍️

## せっかくなのでWebpackではなくViteを試してみた！

いざ作り始める時に、「さーてnpm initしてwebpack準備して……あ、せっかくだから、ビルド系も遊んでみる？？」と思いつき、自分には縁がないだろうと思っていたViteちゃんを試してみました😆

![](/images/2022-01-17_21-52-29.png)

[Vite](https://ja.vitejs.dev/)

Webpackじゃないビルド環境ってどんな感じなんだろうとドキドキしましたが、なんの問題もなく動いて拍子抜けしました。しかも、たしかに早い🏎

`npm init vite@latest`と打つだけでcliで会話式に使用するライブラリを聞かれるので、答えるだけで初期ファイルが生成され、特に意識する事なく`npm run dev`するだけでWEBサーバーが立ち上がります🚀

本番とかで動くか不安だったのですが、特に問題なく`npm run build`も動き、サーバーにはvercel様を利用させていただいたのですが、当然何の問題もなく動きました👏

UIフレームワークはTailwindCSSを採用したのですが、TailwindCSSはVer 3.0以降、WebpackなどにPurgeCSSを自分で設定しなくても、

```js
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  ~~~略~~~
```

とすれば、不必要なCSSプロパティを削除してくれます。簡単！

ん？特殊な事やらないならこれでいいのでは？？

サクっとちょっとしたアプリケーションを開発する時はちょっとViteちゃんを利用したいと思います！

---

というわけで、TypeScript+React+zustand+TailwindCSS+Viteで簡単なアプリケーションを作った日記でした。今年は本格的にReactを触る機会があるので、今から楽しみです🚀

ちなみに完成したアプリケーションを嫁に触ってもらったら、

<div class="balloon_right">
  <div class="img"><img src="/images/yome.png"></div>
  <p>最終的に選んだやつだけサっと一覧で出せないのかよ！やり直し！</p>
</div>

と、手厳しいご意見をいただきました🤢

いやぁ、お腹が痛い中、少ない時間で作ったんやでぇ……。ちょっと時間があったら改造しますわ……。

それでは🤟

<div class="amazfy">
<a href="https://www.amazon.co.jp/dp/B09BV2HGN3?tag=t4traw-22">
<img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B09BV2HGN3&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t4traw-22&language=ja_JP">
<p>モダンJavaScriptの基本から始める　React実践の教科書</p>
</a>
</div>
