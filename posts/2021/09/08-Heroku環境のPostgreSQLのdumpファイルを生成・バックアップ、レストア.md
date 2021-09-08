---
title: Heroku環境のPostgreSQLのdumpファイルを生成・バックアップ、そしてレストア
date: '2021-09-08'
archives: ["2021/09"]
categories:
  - 開発
tags:
  - heroku
  - postgresql
  - dump
image: /images/heroku.png
---
HerokuのPostgreSQLでdumpファイルをレストアする事があったので、備忘録を残しておきます🤲

## バックアップ方法について

まず、HerokuのPostgreSQL（Heroku Postgres Hobby Basic）は、アドオンの画面から簡単にバックアップファイル（dumpファイル）が生成できるようになっています。

![](/images/2021-09-09_08-28-12.png)

それ以外にマニュアルで

```sh
$ heroku pg:backups:download -a YOUR_APP_NAME
```

とコマンドを打つと、カレンドディレクトリにlatest.dumpファイルがダウンロードできます🙂

ただ、これ毎日となるとcron仕込むなりしないと大変なので、定期的なバックアップをしておいて欲しい所。そのコマンドもちゃんと用意されています👍

```sh
$ heroku pg:backups schedule DATABASE_URL --at '02:00 Asia/Tokyo' -a YOUR_APP_NAME
```

↑のコマンドで午前2時に定期的にdumpファイルを生成しておいてくれます！

dumpファイルは最初のHeroku PostgreSQLアドオンのダッシュボードの画面からダウンロードできるようになっています。

## レストアについて

↑でダウンロードしたdumpファイルをレストアします😆

まず、dumpファイルをAWS S3やレンタルサーバーなど、urlでアクセスできるようにしておきます。S3だったらちゃんと公開状態にしておかないといけないのでご注意を！

urlでアクセスできるようになったら、

```sh
$ heroku pg:backups restore 'https://example.com/postgresql.dump' DATABASE_URL -a YOUR_APP_NAME
```

というコマンドでレストアできます！urlの所は適宜書き換えてくださいね🙂 レストアなので、当然すべてのデータがdumpファイルの状態に戻るのでご注意をｗ

2MBくらいのサイズだったらサクっとレストアできました👏

これ系は一番最初に動作確認しておかないと、いざという時に怖いですね！

それでは🤟
