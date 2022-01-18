---
title: 朝おきたらFaradayが動かなくなっていた時の備忘録
date: '2022-01-18'
archives: ["2022/01"]
categories:
  - 開発
tags:
  - ruby
  - gem
  - faraday
  - multipart-post
image: /images/faraday.png
---
朝、自分がメンテしているアプリケーションでアラートが鳴っていて、何やら何かのyahoo-store-api周りでエラーがでています。

あれ？と思いgemを試しに動かしてみると、

```sh
undefined method `authorization' for #<Faraday::Connection:0x0000000125df17d8 @parallel_manager=nil, @headers={}, @params={}, @options=#<Faraday::RequestOptions (empty)>
```

といったエラー。

あー初期化の時のメソッドが変わったのねー。という事で、

```ruby
Faraday.new(url: ACCESS_TOKEN_ENDPOINT) do |c|
  c.adapter Faraday.default_adapter
  # ↓ココ
  c.request :authorization, :Basic, Base64.strict_encode64("#{@application_id}:#{@application_secret}")
  c.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"
end
```

今まで`c.authorization, :Basic`だったのを、`c.request :authorization, :Basic`という形に変えてあげました。

これで動くかなーと思ったら、次は

```sh
:multipart is not registered on Faraday::Request (Faraday::Error)
```

あれ？multipartに関する部分も変わったの？と思って公式のドキュメントを検索してみると、multipartに関する事がそもそも見つからない。そんな事ある？

ん？他の機能どうなってる？と思い、調べてみると、今度は

```sh
uninitialized constant Faraday::UploadIO (NameError)
```

えー、もう全然いろんな部分動かなくなってるやん🤢 Faraday::UploadIOはmultipart-post gemに依存していると見かけたので、`bundle show multipart-post`してみると、Could not find gemが返ってくると。

ここで落ち着いてfaradayのGitHubを見てみると、UPGRADING.mdというのがあるのを発見。

[faraday/UPGRADING.md at main · lostisland/faraday](https://github.com/lostisland/faraday/blob/main/UPGRADING.md)

読んでみると、net_http以外のアダプターはすべて別gemに切り出して、faraday本体はコア機能のみにして開発を集中すると。あー全然追えていませんでしたごめんなさい🥲

あー、bundle updateされてfaradayのバージョンが2.0以上になったのが原因なので、解決方法としては、

- faradayのバージョンを1.xに固定する
- 2.0に上げて、faraday-multipartを利用する

の2つとなります。

ちょっとfaradayを2.0にすると他に影響があるので、ひとまず1.xでちゃんと動く事が分かったので、

```ruby
spec.add_dependency "faraday", "~> 1.8.0"
```

にgemspecを変更し、2.x系に変更するのは色々と様子を見て変えたいと思います😌

それでは🤟
